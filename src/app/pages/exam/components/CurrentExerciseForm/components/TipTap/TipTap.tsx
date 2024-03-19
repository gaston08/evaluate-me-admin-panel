import { useContext } from 'react';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ExerciseContext, defaultCurrentExercise } from 'app/contexts/Exercise';
import { contextExercise } from 'app/shared/interfaces/exercise';
import MenuBar from '../MenuBar';

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
	const { setCurrentExercise } = useContext(ExerciseContext) ;

	const update = (props: { editor: object }) => {
		const editor: { getHTML: () => string } = props.editor;
		setCurrentExercise((prev: contextExercise) => {
			return {
				...prev,
				question: editor.getHTML(),
			};
		});
	};

	return (
		<EditorProvider
			slotBefore={<MenuBar />}
			extensions={extensions}
			content={defaultCurrentExercise.question}
			injectCSS={true}
			onUpdate={update}
		></EditorProvider>
	);
}
