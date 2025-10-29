import { pipeline } from '@huggingface/transformers';

export interface TranscriptSegment {
  startTime: number;
  endTime: number;
  text: string;
}

export class AudioProcessor {
  private static instance: AudioProcessor;
  private whisperPipeline: any = null;

  private constructor() {}

  static getInstance(): AudioProcessor {
    if (!AudioProcessor.instance) {
      AudioProcessor.instance = new AudioProcessor();
    }
    return AudioProcessor.instance;
  }

  async initializeWhisper() {
    if (!this.whisperPipeline) {
      console.log('Initializing Whisper ASR pipeline...');
      this.whisperPipeline = await pipeline(
        'automatic-speech-recognition',
        'onnx-community/whisper-tiny.en',
        { device: 'webgpu' }
      );
      console.log('Whisper ASR pipeline initialized');
    }
    return this.whisperPipeline;
  }

  async transcribeAudioFile(audioFile: File): Promise<TranscriptSegment[]> {
    try {
      const transcriber = await this.initializeWhisper();
      
      // Convert file to array buffer for processing
      const arrayBuffer = await audioFile.arrayBuffer();
      
      // Process with Whisper
      const result = await transcriber(arrayBuffer, {
        return_timestamps: true,
        chunk_length_s: 30,
        stride_length_s: 5,
      });

      // Convert result to our transcript format
      if (result.chunks) {
        return result.chunks.map((chunk: any, index: number) => ({
          startTime: chunk.timestamp[0] || index * 30,
          endTime: chunk.timestamp[1] || (index + 1) * 30,
          text: chunk.text.trim(),
        }));
      }

      // Fallback for simple result
      return [{
        startTime: 0,
        endTime: 60,
        text: result.text || 'Transcription completed',
      }];

    } catch (error) {
      console.error('Error transcribing audio:', error);
      throw new Error('Failed to transcribe audio file');
    }
  }

  async extractAudioFromVideo(videoFile: File): Promise<File> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      video.onloadedmetadata = () => {
        try {
          // Create audio context for processing
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const source = audioContext.createMediaElementSource(video);
          const destination = audioContext.createMediaStreamDestination();
          
          source.connect(destination);
          
          // Record audio stream
          const mediaRecorder = new MediaRecorder(destination.stream);
          const audioChunks: Blob[] = [];
          
          mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
          };
          
          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioFile = new File([audioBlob], 'extracted-audio.wav', { type: 'audio/wav' });
            resolve(audioFile);
          };
          
          mediaRecorder.start();
          video.play();
          
          // Stop recording when video ends
          video.onended = () => {
            mediaRecorder.stop();
            audioContext.close();
          };
          
        } catch (error) {
          reject(error);
        }
      };
      
      video.onerror = () => reject(new Error('Failed to load video'));
      video.src = URL.createObjectURL(videoFile);
    });
  }

  formatTranscriptForDisplay(segments: TranscriptSegment[]): string {
    return segments.map(segment => {
      const startMinutes = Math.floor(segment.startTime / 60);
      const startSeconds = Math.floor(segment.startTime % 60);
      const timeLabel = `${startMinutes}:${startSeconds.toString().padStart(2, '0')}`;
      return `${timeLabel} - ${segment.text}`;
    }).join('\n');
  }

  // YouTube caption extraction (when available)
  async getYouTubeCaptions(videoId: string): Promise<string | null> {
    try {
      console.log('Fetching YouTube captions for video:', videoId);
      
      // Try multiple caption endpoints and formats
      const endpoints = [
        `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en&fmt=json3`,
        `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en-US&fmt=json3`,
        `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en&fmt=srv3`,
        `https://www.youtube.com/api/timedtext?v=${videoId}&fmt=json3`,
        `https://video.google.com/timedtext?v=${videoId}&lang=en&fmt=json3`,
      ];

      for (const endpoint of endpoints) {
        try {
          console.log('Trying endpoint:', endpoint);
          const response = await fetch(endpoint, {
            mode: 'cors',
            headers: {
              'Accept': 'application/json, text/plain, */*',
            }
          });
          
          console.log('Response status:', response.status);
          
          if (response.ok) {
            const text = await response.text();
            console.log('Response text length:', text.length);
            console.log('Response preview:', text.substring(0, 200));
            
            if (!text || text.length < 10) {
              console.log('Empty or too short response, trying next endpoint');
              continue;
            }
            
            // Try to parse as JSON first
            try {
              const data = JSON.parse(text);
              console.log('Parsed JSON data:', data);
              
              // Handle json3 format
              if (data.events && Array.isArray(data.events) && data.events.length > 0) {
                console.log('Found events array with', data.events.length, 'events');
                
                const transcript = data.events
                  .filter((event: any) => event.segs && event.segs.length > 0)
                  .map((event: any) => {
                    const startTime = Math.floor((event.tStartMs || 0) / 1000);
                    const text = event.segs.map((seg: any) => seg.utf8 || seg.text || '').join('').trim();
                    const minutes = Math.floor(startTime / 60);
                    const seconds = startTime % 60;
                    return `${minutes}:${seconds.toString().padStart(2, '0')} - ${text}`;
                  })
                  .filter(line => line.includes(' - ') && !line.endsWith(' - '))
                  .join('\n');
                
                if (transcript.length > 20) {
                  console.log('Successfully extracted transcript:', transcript.substring(0, 100) + '...');
                  return transcript;
                }
              }
              
              // Handle other JSON formats
              if (data.transcript) {
                return data.transcript;
              }
              
              if (data.text) {
                return data.text;
              }
              
            } catch (jsonError) {
              console.log('Not JSON, trying as plain text');
              
              // Handle plain text or XML responses
              if (text.includes('<text') || text.includes('<p ')) {
                // Parse XML/HTML captions
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/xml');
                const textElements = doc.querySelectorAll('text, p');
                
                if (textElements.length > 0) {
                  const transcript = Array.from(textElements)
                    .map((element, index) => {
                      const startAttr = element.getAttribute('start') || element.getAttribute('t');
                      const startTime = startAttr ? Math.floor(parseFloat(startAttr)) : index * 5;
                      const text = element.textContent?.trim() || '';
                      const minutes = Math.floor(startTime / 60);
                      const seconds = startTime % 60;
                      return `${minutes}:${seconds.toString().padStart(2, '0')} - ${text}`;
                    })
                    .filter(line => line.includes(' - ') && !line.endsWith(' - '))
                    .join('\n');
                  
                  if (transcript.length > 20) {
                    console.log('Successfully extracted XML transcript');
                    return transcript;
                  }
                }
              }
              
              // If it's just plain text with content, return it
              if (text.trim().length > 50 && !text.includes('<html')) {
                return `0:00 - ${text.trim()}`;
              }
            }
          }
        } catch (error) {
          console.log('Error with endpoint:', endpoint, error);
          continue;
        }
      }
      
      console.log('No captions found from any endpoint');
      return null;
      
    } catch (error) {
      console.error('Error fetching YouTube captions:', error);
      return null;
    }
  }
}

export const audioProcessor = AudioProcessor.getInstance();