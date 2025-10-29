import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import { Heading } from '@tiptap/extension-heading';
import { Paragraph } from '@tiptap/extension-paragraph';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { Dropcursor } from '@tiptap/extension-dropcursor';
import { Gapcursor } from '@tiptap/extension-gapcursor';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { ListItem } from '@tiptap/extension-list-item';
import { Blockquote } from '@tiptap/extension-blockquote';
import { 
  Bold, Italic, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, 
  Code, Quote, Heading1, Heading2, Heading3, Minus, Type, Palette,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Underline as UnderlineIcon, 
  Strikethrough, Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useEffect, useRef } from 'react';
import { AutoCloseBrackets } from './AutoCloseBracketsExtension';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const lowlight = createLowlight();
  
  // Register languages for syntax highlighting
  lowlight.register('javascript', js);
  lowlight.register('typescript', ts);
  lowlight.register('python', python);
  lowlight.register('html', html);
  lowlight.register('css', css);
  lowlight.register('json', json);
  lowlight.register('js', js);
  lowlight.register('ts', ts);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        paragraph: false,
        horizontalRule: false,
        strike: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        blockquote: false,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc list-outside ml-6 my-4 space-y-2',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal list-outside ml-6 my-4 space-y-2',
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: 'text-lg font-[\'Source_Sans_3\',sans-serif] text-foreground leading-relaxed',
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: 'border-l-4 border-primary/30 pl-6 py-4 my-6 bg-muted/30 italic text-lg text-muted-foreground rounded-r-lg',
        },
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: 'text-lg font-[\'Source_Sans_3\',sans-serif] text-foreground leading-relaxed mb-4 font-normal',
        },
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: 'my-8 border-t-2 border-border/30 w-full',
        },
      }),
      Image.configure({
        inline: false,
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-xl shadow-lg my-8 mx-auto block border border-border/20',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary hover:text-primary/80 underline decoration-primary/50 hover:decoration-primary/80 transition-all duration-200 font-medium',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'code-block-github rounded-lg p-4 font-mono text-sm my-6 overflow-x-auto',
        },
      }),
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Strike.configure({
        HTMLAttributes: {
          class: 'line-through decoration-2',
        },
      }),
      Dropcursor,
      Gapcursor,
      AutoCloseBrackets,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] p-8 text-foreground bg-transparent',
        style: 'line-height: 1.75; font-family: "Source Sans 3", sans-serif;',
      },
    },
    parseOptions: {
      preserveWhitespace: 'full',
    },
  });

  // Ensure formatting states work properly
  useEffect(() => {
    if (editor) {
      const handleSelectionUpdate = () => {
        // This forces the editor to maintain proper formatting state
        setTimeout(() => {
          editor.view.updateState(editor.view.state);
        }, 0);
      };

      const handleTransaction = () => {
        // Ensure formatting buttons reflect current state
        setTimeout(() => {
          editor.view.updateState(editor.view.state);
        }, 0);
      };

      editor.on('selectionUpdate', handleSelectionUpdate);
      editor.on('transaction', handleTransaction);

      return () => {
        editor.off('selectionUpdate', handleSelectionUpdate);
        editor.off('transaction', handleTransaction);
      };
    }
  }, [editor]);

  const addLinkPlaceholder = () => {
    const { from, to } = editor!.state.selection;
    const hasSelection = from !== to;
    
    if (hasSelection) {
      // If text is selected, convert it to a link placeholder
      editor?.chain().focus().setLink({ href: 'https://example.com' }).run();
    } else {
      // If no text selected, insert link placeholder text
      editor?.chain()
        .focus()
        .insertContent('<a href="https://example.com">Link text</a>')
        .run();
    }
  };

  const addImage = () => {
    if (imageUrl) {
      editor?.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setIsImageDialogOpen(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        editor?.chain().focus().setImage({ src: dataUrl }).run();
        setIsImageDialogOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-border rounded-xl bg-card shadow-sm">
      {/* Professional Toolbar */}
      <div className="border-b border-border/50 p-4 bg-background/50">
        <div className="flex flex-wrap items-center gap-1">
          {/* Text Formatting */}
          <div className="flex items-center gap-1 mr-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`h-9 w-9 transition-all ${
                editor.isActive('bold') 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'hover:bg-muted'
              }`}
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`h-9 w-9 transition-all ${
                editor.isActive('italic') 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'hover:bg-muted'
              }`}
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`h-9 w-9 transition-all ${
                editor.isActive('underline') 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'hover:bg-muted'
              }`}
              title="Underline"
            >
              <UnderlineIcon className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`h-9 w-9 transition-all ${
                editor.isActive('strike') 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'hover:bg-muted'
              }`}
              title="Strikethrough"
            >
              <Strikethrough className="w-4 h-4" />
            </Button>
          </div>

          {/* Text Alignment */}
          <div className="flex items-center gap-1 mr-3 border-l border-border/50 pl-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`h-9 w-9 transition-all ${
                editor.isActive({ textAlign: 'left' }) 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'hover:bg-muted'
              }`}
              title="Align Left"
            >
              <AlignLeft className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`h-9 w-9 transition-all ${
                editor.isActive({ textAlign: 'center' }) 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'hover:bg-muted'
              }`}
              title="Align Center"
            >
              <AlignCenter className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`h-9 w-9 transition-all ${
                editor.isActive({ textAlign: 'right' }) 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'hover:bg-muted'
              }`}
              title="Align Right"
            >
              <AlignRight className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              className={`h-9 w-9 transition-all ${
                editor.isActive({ textAlign: 'justify' }) 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'hover:bg-muted'
              }`}
              title="Justify"
            >
              <AlignJustify className="w-4 h-4" />
            </Button>
          </div>

          {/* Headings */}
          <div className="flex items-center gap-1 mr-3 border-l border-border/50 pl-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`h-9 px-3 text-sm font-semibold transition-all ${
                editor.isActive('heading', { level: 1 }) 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'hover:bg-muted'
              }`}
              title="Heading 1"
            >
              H1
            </Button>
            
            <Button
              variant="ghost"
              size="sm"  
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`h-9 px-3 text-sm font-semibold transition-all ${
                editor.isActive('heading', { level: 2 }) 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'hover:bg-muted'
              }`}
              title="Heading 2"
            >
              H2
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`h-9 px-3 text-sm font-semibold transition-all ${
                editor.isActive('heading', { level: 3 }) 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'hover:bg-muted'
              }`}
              title="Heading 3"
            >
              H3
            </Button>
          </div>

          {/* Lists and Quote */}
          <div className="flex items-center gap-1 mr-3 border-l border-border/50 pl-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`h-9 w-9 transition-all ${
                editor.isActive('bulletList') 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'hover:bg-muted'
              }`}
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`h-9 w-9 transition-all ${
                editor.isActive('orderedList') 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'hover:bg-muted'
              }`}
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`h-9 w-9 transition-all ${
                editor.isActive('blockquote') 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'hover:bg-muted'
              }`}
              title="Quote"
            >
              <Quote className="w-4 h-4" />
            </Button>
          </div>

          {/* Code and Links */}
          <div className="flex items-center gap-1 mr-3 border-l border-border/50 pl-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`h-9 w-9 transition-all ${
                editor.isActive('codeBlock') 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'hover:bg-muted'
              }`}
              title="Code Block"
            >
              <Code className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={addLinkPlaceholder}
              className="h-9 w-9 hover:bg-muted transition-all"
              title="Add Link"
            >
              <LinkIcon className="w-4 h-4" />
            </Button>
          </div>

          {/* Media and Elements */}
          <div className="flex items-center gap-1 mr-3 border-l border-border/50 pl-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className="h-9 w-9 hover:bg-muted transition-all"
              title="Separator"
            >
              <Minus className="w-4 h-4" />
            </Button>

            <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 hover:bg-muted transition-all"
                  title="Add Image"
                >
                  <ImageIcon className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg" aria-describedby={undefined}>
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">Add Image</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="url" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="url" className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      From URL
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload File
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="url" className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="image-url" className="text-sm font-medium">
                        Image URL
                      </Label>
                      <Input
                        id="image-url"
                        placeholder="https://example.com/image.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addImage()}
                        className="mt-2"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsImageDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={addImage} disabled={!imageUrl}>
                        Add Image
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="upload" className="space-y-4 mt-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Click to select an image file
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="relative"
                      >
                        Choose File
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setIsImageDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Professional Editor Area */}
      <div className="bg-background/50 backdrop-blur-sm">
        <style>{`
          .ProseMirror {
            outline: none !important;
            border: none !important;
            font-family: "Source Sans 3", sans-serif;
            line-height: 1.75;
            padding: 2rem !important;
          }
          .ProseMirror h1 {
            font-size: 2.25rem !important;
            font-weight: 700 !important;
            font-family: "Poppins", sans-serif !important;
            color: hsl(var(--foreground)) !important;
            margin-bottom: 1.5rem !important;
            margin-top: 2rem !important;
            line-height: 1.2 !important;
          }
          .ProseMirror h2 {
            font-size: 1.875rem !important;
            font-weight: 700 !important;
            font-family: "Poppins", sans-serif !important;
            color: hsl(var(--foreground)) !important;
            margin-bottom: 1.25rem !important;
            margin-top: 1.75rem !important;
            line-height: 1.3 !important;
          }
          .ProseMirror h3 {
            font-size: 1.5rem !important;
            font-weight: 600 !important;
            font-family: "Poppins", sans-serif !important;
            color: hsl(var(--foreground)) !important;
            margin-bottom: 1rem !important;
            margin-top: 1.5rem !important;
            line-height: 1.4 !important;
          }
          .ProseMirror ul {
            list-style-type: disc !important;
            padding-left: 1.5rem !important;
            margin: 1rem 0 !important;
          }
          .ProseMirror ol {
            list-style-type: decimal !important;
            padding-left: 1.5rem !important;
            margin: 1rem 0 !important;
          }
          .ProseMirror li {
            margin: 0.5rem 0 !important;
            line-height: 1.6 !important;
          }
          .ProseMirror blockquote {
            border-left: 4px solid hsl(var(--primary) / 0.3) !important;
            padding-left: 1.5rem !important;
            padding-top: 1rem !important;
            padding-bottom: 1rem !important;
            margin: 1.5rem 0 !important;
            background: hsl(var(--muted) / 0.3) !important;
            font-style: italic !important;
            color: hsl(var(--muted-foreground)) !important;
            border-radius: 0 0.5rem 0.5rem 0 !important;
          }
          .ProseMirror pre {
            background: #1a1b26 !important;
            border: 1px solid #313244 !important;
            border-radius: 0.75rem !important;
            padding: 1.5rem !important;
            margin: 1.5rem 0 !important;
            overflow-x: auto !important;
            font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace !important;
            font-size: 0.9rem !important;
            line-height: 1.6 !important;
            color: #eef0f9 !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2) !important;
          }
          .ProseMirror .hljs {
            background: #1a1b26 !important;
            color: #eef0f9 !important;
            padding: 0 !important;
          }
          .ProseMirror .hljs-keyword {
            color: #54b9ff !important;
            font-weight: 600 !important;
          }
          .ProseMirror .hljs-string {
            color: #4bf3c8 !important;
          }
          .ProseMirror .hljs-number {
            color: #ffd493 !important;
          }
          .ProseMirror .hljs-built_in {
            color: #00daef !important;
          }
          .ProseMirror .hljs-function {
            color: #00daef !important;
            font-weight: 600 !important;
          }
          .ProseMirror .hljs-comment {
            color: #545864 !important;
            font-style: italic !important;
          }
          .ProseMirror .hljs-variable {
            color: #eef0f9 !important;
          }
          .ProseMirror .hljs-attr {
            color: #4bf3c8 !important;
          }
          .ProseMirror .hljs-property {
            color: #4bf3c8 !important;
          }
          .ProseMirror .hljs-name {
            color: #acafff !important;
          }
          .ProseMirror .hljs-title {
            color: #acafff !important;
            font-weight: 600 !important;
          }
          .ProseMirror .hljs-literal {
            color: #ffd493 !important;
          }
          .ProseMirror .hljs-params {
            color: #eef0f9 !important;
          }
          .ProseMirror .hljs-operator {
            color: #eef0f9 !important;
          }
          .ProseMirror .hljs-punctuation {
            color: #eef0f9 !important;
          }
          .ProseMirror .hljs-tag {
            color: #54b9ff !important;
          }
          .ProseMirror .hljs-type {
            color: #acafff !important;
          }
          .ProseMirror code {
            background: #1a1b26 !important;
            color: #eef0f9 !important;
          }
          .ProseMirror p {
            font-size: 1.125rem !important;
            font-family: "Source Sans 3", sans-serif !important;
            color: hsl(var(--foreground)) !important;
            line-height: 1.75 !important;
            margin-bottom: 1rem !important;
            font-weight: 400 !important;
          }
          .ProseMirror strong {
            font-weight: 700 !important;
            color: hsl(var(--foreground)) !important;
          }
          .ProseMirror em {
            font-style: italic !important;
            color: hsl(var(--foreground)) !important;
          }
          .ProseMirror u {
            text-decoration: underline !important;
            color: hsl(var(--foreground)) !important;
          }
          .ProseMirror s {
            text-decoration: line-through !important;
            text-decoration-thickness: 2px !important;
            color: hsl(var(--foreground)) !important;
          }
          .ProseMirror a {
            color: hsl(var(--primary)) !important;
            text-decoration: underline !important;
            text-decoration-color: hsl(var(--primary) / 0.5) !important;
          }
          .ProseMirror a:hover {
            color: hsl(var(--primary) / 0.8) !important;
            text-decoration-color: hsl(var(--primary) / 0.8) !important;
          }
          .ProseMirror hr {
            border: none !important;
            border-top: 2px solid hsl(var(--border) / 0.3) !important;
            margin: 2rem 0 !important;
            width: 100% !important;
          }
          .ProseMirror img {
            max-width: 100% !important;
            height: auto !important;
            border-radius: 0.75rem !important;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
            margin: 2rem auto !important;
            display: block !important;
            border: 1px solid hsl(var(--border) / 0.2) !important;
          }
        `}</style>
        <EditorContent 
          editor={editor} 
          className="min-h-[400px] max-h-[600px] overflow-y-auto"
        />
      </div>
    </div>
  );
}