import { useContext } from 'react';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ExerciseContext } from 'app/contexts/Exercise';
import { contextExercise } from 'app/shared/interfaces/exercise';
import MenuBar from '../MenuBar';
import { EditorContent } from '@tiptap/react';

const extensions = [
	Color.configure({ types: [TextStyle.name, ListItem.name] }),
	TextStyle.configure({ types: [ListItem.name] }),
	StarterKit.configure({
		bulletList: {
			keepMarks: true,
			keepAttributes: false,
		},
		orderedList: {
			keepMarks: true,
			keepAttributes: false,
		},
	}),
];

export default function TipTap() {
	console.log('tiptap');
	const { setCurrentExercise } = useContext(ExerciseContext);

	const editor = useEditor({
		extensions,
		content: '<p></p>',
		onUpdate({ editor }) {
			setCurrentExercise((prev: contextExercise) => {
				return {
					...prev,
					question: [editor.getHTML()],
				};
			});
		},
	});
	if (editor === null) return null;

	return (
		<div>
			<MenuBar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
}
