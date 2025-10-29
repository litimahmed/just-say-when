import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { TextSelection } from '@tiptap/pm/state';

const autoCloseBracketsPlugin = new PluginKey('autoCloseBrackets');

const bracketPairs: Record<string, string> = {
  '(': ')',
  '[': ']',
  '{': '}',
  '"': '"',
  "'": "'",
  '`': '`'
};

export const AutoCloseBrackets = Extension.create({
  name: 'autoCloseBrackets',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: autoCloseBracketsPlugin,
        props: {
          handleTextInput(view, from, to, text) {
            // Only handle this in code blocks
            const { state } = view;
            const { $from } = state.selection;
            
            // Check if we're in a code block
            const isInCodeBlock = $from.node().type.name === 'codeBlock';
            if (!isInCodeBlock) {
              return false;
            }

            const openingBracket = text;
            const closingBracket = bracketPairs[openingBracket];
            
            if (closingBracket) {
              const tr = state.tr;
              
              // Insert the opening bracket
              tr.insertText(openingBracket, from, to);
              
              // Insert the closing bracket
              tr.insertText(closingBracket, from + 1);
              
              // Position cursor between brackets
              const newPos = from + 1;
              tr.setSelection(TextSelection.create(tr.doc, newPos));
              
              view.dispatch(tr);
              return true;
            }
            
            return false;
          },
          
          handleKeyDown(view, event) {
            const { state } = view;
            const { $from } = state.selection;
            
            // Check if we're in a code block
            const isInCodeBlock = $from.node().type.name === 'codeBlock';
            if (!isInCodeBlock) {
              return false;
            }

            // Handle closing bracket skip
            if (event.key in Object.values(bracketPairs)) {
              const pos = $from.pos;
              const nextChar = state.doc.textBetween(pos, pos + 1);
              
              if (nextChar === event.key) {
                event.preventDefault();
                const tr = state.tr.setSelection(
                  TextSelection.create(state.tr.doc, pos + 1)
                );
                view.dispatch(tr);
                return true;
              }
            }
            
            // Handle Backspace to delete bracket pairs
            if (event.key === 'Backspace') {
              const pos = $from.pos;
              const beforeChar = state.doc.textBetween(pos - 1, pos);
              const afterChar = state.doc.textBetween(pos, pos + 1);
              
              if (beforeChar in bracketPairs && bracketPairs[beforeChar] === afterChar) {
                event.preventDefault();
                const tr = state.tr.delete(pos - 1, pos + 1);
                view.dispatch(tr);
                return true;
              }
            }
            
            return false;
          }
        }
      })
    ];
  }
});