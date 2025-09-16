import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Type, 
  Palette, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Bold,
  Italic,
  Underline,
  Move,
  RotateCw,
  Copy,
  Trash2,
  Undo,
  Redo,
  Eye,
  EyeOff
} from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';

interface CanvaEditorProps {
  onClose: () => void;
}

interface EditorElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  rotation?: number;
  opacity?: number;
  textAlign?: 'left' | 'center' | 'right';
  isLocked?: boolean;
  isVisible?: boolean;
}

export const CanvaEditor: React.FC<CanvaEditorProps> = ({ onClose }) => {
  const { state } = useResume();
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [elements, setElements] = useState<EditorElement[]>([
    {
      id: '1',
      type: 'text',
      content: state.currentResume?.personalInfo.fullName || 'Your Name',
      x: 50,
      y: 50,
      width: 300,
      height: 40,
      fontSize: 32,
      fontFamily: 'Inter',
      fontWeight: 'bold',
      color: '#1f2937',
      textAlign: 'left',
      isVisible: true
    },
    {
      id: '2',
      type: 'text',
      content: 'Professional Summary',
      x: 50,
      y: 120,
      width: 200,
      height: 24,
      fontSize: 18,
      fontFamily: 'Inter',
      fontWeight: '600',
      color: '#374151',
      textAlign: 'left',
      isVisible: true
    }
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const colors = [
    '#000000', '#ffffff', '#374151', '#6b7280', '#ef4444', '#f97316',
    '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'
  ];

  const fonts = [
    'Inter', 'Arial', 'Times New Roman', 'Georgia', 'Helvetica', 'Verdana'
  ];

  const handleElementClick = (elementId: string) => {
    setSelectedElement(elementId);
  };

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    const element = elements.find(el => el.id === elementId);
    if (!element) return;

    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
    setSelectedElement(elementId);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !selectedElement || !canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const newX = e.clientX - canvasRect.left - dragOffset.x;
    const newY = e.clientY - canvasRect.top - dragOffset.y;

    setElements(prevElements =>
      prevElements.map(element =>
        element.id === selectedElement
          ? { ...element, x: Math.max(0, newX), y: Math.max(0, newY) }
          : element
      )
    );
  }, [isDragging, selectedElement, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const updateElement = (elementId: string, updates: Partial<EditorElement>) => {
    setElements(prevElements =>
      prevElements.map(element =>
        element.id === elementId ? { ...element, ...updates } : element
      )
    );
  };

  const selectedElementData = elements.find(el => el.id === selectedElement);

  const addTextElement = () => {
    const newElement: EditorElement = {
      id: Date.now().toString(),
      type: 'text',
      content: 'New Text',
      x: 100,
      y: 100,
      width: 200,
      height: 30,
      fontSize: 16,
      fontFamily: 'Inter',
      color: '#000000',
      textAlign: 'left',
      isVisible: true
    };
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
  };

  const duplicateElement = () => {
    if (!selectedElementData) return;
    
    const newElement: EditorElement = {
      ...selectedElementData,
      id: Date.now().toString(),
      x: selectedElementData.x + 20,
      y: selectedElementData.y + 20
    };
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
  };

  const deleteElement = () => {
    if (!selectedElement) return;
    setElements(prev => prev.filter(el => el.id !== selectedElement));
    setSelectedElement(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <header className="h-16 bg-gradient-card backdrop-blur-sm border-b border-white/10 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-foreground">Resume Editor</h1>
          <Badge className="bg-primary/20 text-primary border-primary/30">
            Canva-Style Editor
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Redo className="w-4 h-4" />
          </Button>
          <Button variant="premium" size="sm" onClick={onClose}>
            Done Editing
          </Button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-80 bg-gradient-card backdrop-blur-sm border-r border-white/10 overflow-y-auto">
          <div className="p-4">
            <Tabs defaultValue="elements" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="elements">Elements</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="layers">Layers</TabsTrigger>
              </TabsList>

              <TabsContent value="elements" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Add Elements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={addTextElement}
                    >
                      <Type className="w-4 h-4 mr-2" />
                      Add Text
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Palette className="w-4 h-4 mr-2" />
                      Add Shape
                    </Button>
                  </CardContent>
                </Card>

                {selectedElementData && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Element Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={duplicateElement}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start text-destructive"
                        onClick={deleteElement}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="design" className="mt-4 space-y-4">
                {selectedElementData && (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Typography</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="text-xs">Font Family</Label>
                          <select 
                            className="w-full mt-1 p-2 text-sm border rounded"
                            value={selectedElementData.fontFamily || 'Inter'}
                            onChange={(e) => updateElement(selectedElement!, { fontFamily: e.target.value })}
                          >
                            {fonts.map(font => (
                              <option key={font} value={font}>{font}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <Label className="text-xs">Font Size</Label>
                          <Slider
                            value={[selectedElementData.fontSize || 16]}
                            onValueChange={([value]) => updateElement(selectedElement!, { fontSize: value })}
                            max={72}
                            min={8}
                            step={1}
                            className="mt-2"
                          />
                          <span className="text-xs text-muted-foreground">{selectedElementData.fontSize}px</span>
                        </div>

                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateElement(selectedElement!, { 
                              fontWeight: selectedElementData.fontWeight === 'bold' ? 'normal' : 'bold' 
                            })}
                          >
                            <Bold className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Italic className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Underline className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateElement(selectedElement!, { textAlign: 'left' })}
                          >
                            <AlignLeft className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateElement(selectedElement!, { textAlign: 'center' })}
                          >
                            <AlignCenter className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateElement(selectedElement!, { textAlign: 'right' })}
                          >
                            <AlignRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Colors</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-6 gap-2">
                          {colors.map(color => (
                            <button
                              key={color}
                              className="w-8 h-8 rounded border-2 border-white shadow-sm"
                              style={{ backgroundColor: color }}
                              onClick={() => updateElement(selectedElement!, { color })}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </TabsContent>

              <TabsContent value="layers" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Layers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {elements.map(element => (
                      <div
                        key={element.id}
                        className={`p-2 rounded border cursor-pointer flex items-center justify-between ${
                          selectedElement === element.id ? 'border-primary bg-primary/10' : 'border-border'
                        }`}
                        onClick={() => handleElementClick(element.id)}
                      >
                        <div className="flex items-center space-x-2">
                          <Type className="w-4 h-4" />
                          <span className="text-sm truncate">{element.content.substring(0, 20)}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateElement(element.id, { isVisible: !element.isVisible });
                          }}
                        >
                          {element.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-muted/20 overflow-auto">
          <div className="min-h-full flex items-center justify-center p-8">
            <div
              ref={canvasRef}
              className="relative bg-white shadow-luxury rounded-lg"
              style={{ width: '595px', height: '842px' }} // A4 size in px
            >
              {elements.map(element => (
                element.isVisible && (
                  <div
                    key={element.id}
                    className={`absolute cursor-move border-2 ${
                      selectedElement === element.id ? 'border-primary' : 'border-transparent'
                    } hover:border-primary/50`}
                    style={{
                      left: element.x,
                      top: element.y,
                      width: element.width,
                      height: element.height,
                      fontSize: element.fontSize,
                      fontFamily: element.fontFamily,
                      fontWeight: element.fontWeight,
                      color: element.color,
                      textAlign: element.textAlign,
                      backgroundColor: element.backgroundColor,
                      transform: `rotate(${element.rotation || 0}deg)`,
                      opacity: element.opacity || 1
                    }}
                    onMouseDown={(e) => handleMouseDown(e, element.id)}
                    onClick={() => handleElementClick(element.id)}
                  >
                    {element.type === 'text' && (
                      <input
                        type="text"
                        value={element.content}
                        onChange={(e) => updateElement(element.id, { content: e.target.value })}
                        className="w-full h-full bg-transparent border-none outline-none resize-none"
                        style={{
                          fontSize: element.fontSize,
                          fontFamily: element.fontFamily,
                          fontWeight: element.fontWeight,
                          color: element.color,
                          textAlign: element.textAlign
                        }}
                      />
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};