import { useState, useEffect } from "react";
import { X, Upload, Link, FileText, Video, HelpCircle, BookCheck, Save, Eye, Clock, MessageSquare, Youtube, Wand2, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentItem, ContentType } from "./ContentTypes";
import { RichTextEditor } from "./RichTextEditor";
import { VideoTranscriptPlayer } from "./VideoTranscriptPlayer";
import { pipeline } from '@huggingface/transformers';
import { toast } from 'sonner';
import { audioProcessor } from './AudioProcessor';

interface ContentItemEditorProps {
  isOpen: boolean;
  onClose: () => void;
  contentItem?: ContentItem;
  onSave: (item: ContentItem) => void;
  lessonId: string;
}

export function ContentItemEditor({ isOpen, onClose, contentItem, onSave, lessonId }: ContentItemEditorProps) {
  const [activeTab, setActiveTab] = useState<ContentType>(contentItem?.type || "text");
  const [title, setTitle] = useState(contentItem?.title || "");
  const [isGeneratingTranscript, setIsGeneratingTranscript] = useState(false);
  const [videoTranscript, setVideoTranscript] = useState("");

  useEffect(() => {
    sessionStorage.setItem('editDialogOpen', isOpen.toString());
    if (isOpen) {
      window.dispatchEvent(new Event('storage'));
    }
  }, [isOpen]);
  
  // Extract YouTube video ID from URL
  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const [videoData, setVideoData] = useState(() => {
    if (contentItem?.type === "video") {
      const data = contentItem.data as any;
      return {
        url: data.url || "",
        duration: data.duration || 0,
        hasTranscript: data.hasTranscript || false,
        transcriptContent: data.transcriptContent || "",
      };
    }
    return { url: "", duration: 0, hasTranscript: false, transcriptContent: "" };
  });
  const [textContent, setTextContent] = useState(() => {
    if (contentItem?.type === "text") {
      const data = contentItem.data as any;
      return data.content || "";
    }
    return "";
  });
  const [quizData, setQuizData] = useState(() => {
    if (contentItem?.type === "quiz") {
      const data = contentItem.data as any;
      return {
        questions: data.questions || [],
        passingScore: data.passingScore || 70,
        allowRetakes: data.allowRetakes !== false,
      };
    }
    return { questions: [], passingScore: 70, allowRetakes: true };
  });
  const [assignmentData, setAssignmentData] = useState(() => {
    if (contentItem?.type === "assignment") {
      const data = contentItem.data as any;
      return {
        description: data.description || "",
        submissionType: data.submissionType || "both" as const,
        allowedFileTypes: data.allowedFileTypes || ["pdf", "doc", "docx"],
      };
    }
    return { description: "", submissionType: "both" as const, allowedFileTypes: ["pdf", "doc", "docx"] };
  });
  const [transcriptData, setTranscriptData] = useState(() => {
    if (contentItem?.type === "transcript") {
      const data = contentItem.data as any;
      return {
        videoId: data.videoId || "",
        content: data.content || "",
        timestamps: data.timestamps || [],
      };
    }
    return { videoId: "", content: "", timestamps: [] };
  });

  // Auto-generate transcript function with real processing
  const generateTranscript = async () => {
    const youtubeId = extractYouTubeId(videoData.url);
    if (!youtubeId) {
      toast.error('Please enter a valid YouTube URL first');
      return;
    }

    setIsGeneratingTranscript(true);
    
    try {
      console.log('Starting transcript generation for video:', youtubeId);
      
      // Step 1: Try to get existing YouTube captions
      toast.info('Extracting captions from YouTube...');
      const existingCaptions = await audioProcessor.getYouTubeCaptions(youtubeId);
      
      if (existingCaptions && existingCaptions.length > 50) {
        console.log('Successfully got captions:', existingCaptions.substring(0, 100));
        setVideoTranscript(existingCaptions);
        setVideoData(prev => ({ 
          ...prev, 
          hasTranscript: true, 
          transcriptContent: existingCaptions 
        }));
        toast.success('Successfully extracted captions from YouTube!');
        return;
      }

      console.log('No valid captions found, explaining limitations');
      
      // Step 2: If no captions, explain the limitation
      toast.warning('No captions available for this YouTube video');
      
      // Only show demo if no real captions were found
      toast.info('This video doesn\'t have captions enabled. Try a different video with captions, or upload your own video file for AI transcription.');
      
    } catch (error) {
      console.error('Error generating transcript:', error);
      toast.error('Failed to extract captions. This video may not have captions enabled.');
    } finally {
      setIsGeneratingTranscript(false);
    }
  };

  const handleSave = () => {
    let data: any;
    
    switch (activeTab) {
      case "video":
        data = videoData;
        break;
      case "text":
        data = { content: textContent, formatting: "html" };
        break;
      case "quiz":
        data = quizData;
        break;
      case "assignment":
        data = assignmentData;
        break;
      case "transcript":
        data = transcriptData;
        break;
      default:
        data = {};
    }

    const item: ContentItem = {
      id: contentItem?.id || `content-${Date.now()}`,
      type: activeTab,
      title,
      order: contentItem?.order || 0,
      data,
    };

    onSave(item);
    onClose();
  };

  const renderVideoEditor = () => {
    const youtubeId = extractYouTubeId(videoData.url);
    
    return (
      <div className="space-y-6">
        {/* YouTube URL Input */}
        <div className="space-y-2">
          <Label htmlFor="youtubeUrl" className="flex items-center gap-2">
            <Youtube className="h-4 w-4 text-red-500" />
            YouTube URL
          </Label>
          <Input
            id="youtubeUrl"
            value={videoData.url}
            onChange={(e) => setVideoData(prev => ({ ...prev, url: e.target.value }))}
            placeholder="https://www.youtube.com/watch?v=..."
            className="font-mono text-sm"
          />
        </div>

        {/* Video Preview */}
        {youtubeId && (
          <div className="space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
                title="YouTube video preview"
                className="w-full h-full"
                allowFullScreen
              />
            </div>
            
            {/* Auto-generate Transcript */}
            <div className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="flex-1">
                <h4 className="font-medium">Auto-Generate Transcript</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Extract transcript from YouTube captions or use AI transcription
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• First attempts to get YouTube's automatic captions</div>
                  <div>• Falls back to Whisper ASR for uploaded videos</div>
                  <div>• WebGPU acceleration for fast processing</div>
                </div>
              </div>
              <Button 
                onClick={generateTranscript}
                disabled={isGeneratingTranscript}
                variant="outline"
                className="ml-4 shrink-0"
              >
                {isGeneratingTranscript ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                {isGeneratingTranscript ? 'Generating...' : 'Generate'}
              </Button>
            </div>

            {/* Transcript Status */}
            {videoData.hasTranscript && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Transcript Available</Badge>
                <span className="text-sm text-muted-foreground">
                  Transcript has been generated and will be embedded with the video
                </span>
              </div>
            )}
          </div>
        )}

        {/* Video with Transcript Player */}
        {youtubeId && videoData.hasTranscript && (
          <div className="border rounded-lg p-4 bg-muted/50">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              Video with Interactive Transcript
              <Badge variant="outline">Preview</Badge>
            </h4>
            <VideoTranscriptPlayer 
              videoUrl={videoData.url}
              title={title || "Video Lesson"}
              transcript={videoData.transcriptContent ? [{ id: '1', time: 0, text: videoData.transcriptContent }] : []}
              onTranscriptUpdate={(transcript) => {
                const content = transcript.map(t => t.text).join('\n');
                setVideoData(prev => ({ ...prev, transcriptContent: content }));
              }}
            />
          </div>
        )}

        {/* Video Upload Option */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Or Upload Video File (Coming Soon)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center opacity-50">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium">Upload Video File</p>
              <p className="text-xs text-muted-foreground">MP4, MOV, AVI up to 500MB</p>
              <Button variant="outline" size="sm" className="mt-2" disabled>
                Choose File (Coming Soon)
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTextEditor = () => (
    <div className="space-y-4">
      <Label>Content</Label>
      <RichTextEditor
        content={textContent}
        onChange={setTextContent}
        placeholder="Write your lesson content..."
      />
    </div>
  );

  const renderQuizEditor = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Passing Score (%)</Label>
          <Input 
            type="number"
            value={quizData.passingScore}
            onChange={(e) => setQuizData(prev => ({ ...prev, passingScore: parseInt(e.target.value) || 70 }))}
          />
        </div>
        <div className="flex items-center space-x-2 pt-6">
          <Switch
            checked={quizData.allowRetakes}
            onCheckedChange={(checked) => setQuizData(prev => ({ ...prev, allowRetakes: checked }))}
          />
          <Label>Allow Retakes</Label>
        </div>
      </div>
      
      <div className="border border-border rounded-lg p-4 text-center">
        <HelpCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm font-medium">Quiz Builder</p>
        <p className="text-xs text-muted-foreground mb-4">Questions will be managed separately</p>
        <Button variant="outline" size="sm">
          Open Quiz Builder
        </Button>
      </div>
    </div>
  );

  const renderAssignmentEditor = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Assignment Description</Label>
        <Textarea
          placeholder="Describe the assignment requirements..."
          value={assignmentData.description}
          onChange={(e) => setAssignmentData(prev => ({ ...prev, description: e.target.value }))}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>Submission Type</Label>
        <Select 
          value={assignmentData.submissionType} 
          onValueChange={(value: any) => setAssignmentData(prev => ({ ...prev, submissionType: value }))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="file">File Upload Only</SelectItem>
            <SelectItem value="text">Text Submission Only</SelectItem>
            <SelectItem value="both">Both File and Text</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Allowed File Types</Label>
        <div className="flex flex-wrap gap-2">
          {["pdf", "doc", "docx", "txt", "jpg", "png"].map((type) => (
            <Badge 
              key={type}
              variant={assignmentData.allowedFileTypes.includes(type) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => {
                setAssignmentData(prev => ({
                  ...prev,
                  allowedFileTypes: prev.allowedFileTypes.includes(type)
                    ? prev.allowedFileTypes.filter(t => t !== type)
                    : [...prev.allowedFileTypes, type]
                }));
              }}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTranscriptEditor = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Associated Video</Label>
        <Select 
          value={transcriptData.videoId} 
          onValueChange={(value) => setTranscriptData(prev => ({ ...prev, videoId: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select video for this transcript" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="video-1">Main Video Lesson</SelectItem>
            <SelectItem value="video-2">Introduction Video</SelectItem>
            <SelectItem value="none">No specific video</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Transcript Content</Label>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Import File
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Auto-Generate
            </Button>
          </div>
        </div>
        <RichTextEditor
          content={transcriptData.content}
          onChange={(content) => setTranscriptData(prev => ({ ...prev, content }))}
          placeholder="Enter or paste the video transcript here..."
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Timestamps (Optional)</Label>
          <Button variant="outline" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            Add Timestamp
          </Button>
        </div>
        <div className="border border-border rounded-lg p-4">
          {transcriptData.timestamps.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No timestamps added yet. Add timestamps to make the transcript interactive.
            </p>
          ) : (
            <div className="space-y-2">
              {transcriptData.timestamps.map((timestamp, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 border border-border rounded">
                  <Input 
                    type="text" 
                    placeholder="00:00" 
                    value={`${Math.floor(timestamp.time / 60)}:${(timestamp.time % 60).toString().padStart(2, '0')}`}
                    className="w-20"
                  />
                  <Input 
                    placeholder="Transcript text for this timestamp..."
                    value={timestamp.text}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="sm">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );


  const contentTypes = [
    { id: "text", label: "Article", icon: FileText },
    { id: "video", label: "Video", icon: Video },
    { id: "quiz", label: "Quiz", icon: HelpCircle },
    { id: "assignment", label: "Assignment", icon: BookCheck },
    { id: "transcript", label: "Transcript", icon: MessageSquare },
  ] as const;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>{contentItem ? "Edit" : "Add"} Content Item</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Content Title</Label>
            <Input
              placeholder="Enter content title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {contentItem ? (
            // Editing existing content - show only the specific editor
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                {contentTypes.find(type => type.id === activeTab)?.icon && 
                  (() => {
                    const IconComponent = contentTypes.find(type => type.id === activeTab)?.icon!;
                    return <IconComponent className="w-5 h-5" />;
                  })()
                }
                <span className="text-lg font-medium">
                  {contentTypes.find(type => type.id === activeTab)?.label} Content
                </span>
              </div>
              
              {activeTab === "video" && renderVideoEditor()}
              {activeTab === "text" && renderTextEditor()}
              {activeTab === "transcript" && renderTranscriptEditor()}
              {activeTab === "quiz" && renderQuizEditor()}
              {activeTab === "assignment" && renderAssignmentEditor()}
              
            </div>
          ) : (
            // Creating new content - show tabs to choose type
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ContentType)}>
              <TabsList className="grid w-full grid-cols-5">
                {contentTypes.map((type) => (
                  <TabsTrigger key={type.id} value={type.id} className="flex items-center space-x-1">
                    <type.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{type.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="text">{renderTextEditor()}</TabsContent>
              <TabsContent value="video">{renderVideoEditor()}</TabsContent>
              <TabsContent value="quiz">{renderQuizEditor()}</TabsContent>
              <TabsContent value="assignment">{renderAssignmentEditor()}</TabsContent>
              <TabsContent value="transcript">{renderTranscriptEditor()}</TabsContent>
            </Tabs>
          )}

          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Content
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}