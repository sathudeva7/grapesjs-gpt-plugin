export default (editor, opts = {}) => {
  const bm = editor.BlockManager;

  bm.add('gpt-ai', {
    label: 'GPT AI',
    content: `<div>Click Magic button to create AI Content</div>`,
    // media: '<svg>...</svg>',
  });
}
