import { memo, useContext, useEffect } from 'react';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ExerciseContext } from 'app/contexts/Exercise';
import { exerciseType } from 'app/shared/interfaces/exercise';
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

const memoTipTap = memo(function TipTap() {
	const { setCurrentExercise, currentExercise } = useContext(ExerciseContext);

	const editor = useEditor({
		extensions,
		content: '<p></p>',
		onUpdate({ editor }) {
			setCurrentExercise((prev: exerciseType) => {
				const newArgumentArr: Array<string> = [...prev.argument];
				newArgumentArr[0].text = editor.getHTML();
				return {
					...prev,
					argument: newArgumentArr,
				};
			});
		},
	});

	useEffect(() => {
		if (editor !== null) {
			editor.commands.setContent(
				currentExercise.argument[currentExercise.argument.length - 1],
			);
		}
	}, [currentExercise.argument.length]);

	if (editor === null) return null;

	return (
		<div>
			<MenuBar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
});

export default memoTipTap;
