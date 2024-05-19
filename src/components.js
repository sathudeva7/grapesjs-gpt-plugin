export default (editor, opts = {}) => {
  const domc = editor.DomComponents;

  domc.addType("text", {
    isComponent: (el) => el.id === "text",
    model: {
      defaults: {
        // Default props
        toolbar: [
          {
            attributes: { class: "fa fa-arrows" },
            command: "tlb-move",
          },
          {
            attributes: { class: "fa fa-clone" },
            command: "tlb-clone",
          },
          {
            attributes: { class: "fa fa-magic" },
            command: "gen-ai-text",
          },
          {
            attributes: { class: "fa fa-trash-o" },
            command: "tlb-delete",
          },
        ],
      },
    },
    view: {},
  });
};
