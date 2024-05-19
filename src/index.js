import loadComponents from "./components";
import loadBlocks from "./blocks";
import en from "./locale/en";

export default (editor, opts = {}) => {
  const options = {
    ...{
      i18n: {},
      // default options
    },
    ...opts,
  };

  // Add components
  loadComponents(editor, options);
  // Add blocks
  loadBlocks(editor, options);
  // Load i18n files
  editor.I18n &&
    editor.I18n.addMessages({
      en,
      ...options.i18n,
    });

  const commands = editor.Commands;

  commands.add("gen-ai-text", (editor) => {
    console.log("dsd");
    const modal = editor.Modal;
    const container = document.createElement("div");

    const styles = `<style>
    .textbox-label {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        color: white;
    }

    .textbox-input {
        margin-top: 0.25rem;
        display: block;
        width: 80%;
        padding: 0.625rem;
        border: 1px solid #d2d6dc; /* border-gray-300 */
        border-radius: 0.375rem; /* rounded-md */
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
        focus: ring 1px solid #3b82f6; /* focus:ring-blue-500 */
        focus: border-color: #3b82f6; /* focus:border-blue-500 */
    }

    .submit-btn {
        margin-top: 0.5rem;
        padding: 0.5rem 1rem;
        border: 1px solid transparent;
        border-radius: 0.375rem; /* rounded-md */
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
        font-size: 0.875rem; /* text-sm */
        font-weight: 500; /* font-medium */
        color: #fff; /* text-white */
        background-color: #2563eb; /* bg-blue-600 */
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .submit-btn:hover {
        background-color: #1d4ed8; /* bg-blue-700 */
    }

    .submit-btn:focus {
        outline: none;
        ring: 2px solid #3b82f6; /* focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 */
        ring-offset: 2px;
    }
</style>`;

    // Create the HTML for your textbox and possibly a submit button
    container.innerHTML = `${styles}
    <label for="textboxInput" class="textbox-label">Enter Content:</label>
    <textarea id="textboxInput" name="textboxInput" rows="4" class="textbox-input"></textarea>
    <button id="submitBtn" class="submit-btn">Submit</button>
    `;

    // Optionally, add an event listener to the submit button
    container.querySelector("#submitBtn").addEventListener("click", () => {
      const submitButton = container.querySelector("#submitBtn");
      const inputValue = container.querySelector("#textboxInput").value;

      submitButton.innerHTML = "Loading..";
      submitButton.disabled = true;

      const OPENAI_API_KEY = opts.open_ai_key; // Replace with your actual API key

      fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: `${opts.gpt_model}`,
          messages: [
            {
              role: "system",
              content: "You are a text creation assistant",
            },
            {
              role: "user",
              content: `${opts.user_content} ${inputValue}`,
            },
          ],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          let msg = data.choices[0]?.message?.content;
          const selectedComponent = editor.getSelected();

          if (selectedComponent && selectedComponent.is("text")) {
            selectedComponent.set("content", msg);
            selectedComponent.append(msg);
          } else {
            console.log(
              "Selected component does not support direct text content."
            );
          }
          modal.close(); // Close the modal after submitting
        })
        .catch((error) => console.error("Error:", error))
        .finally(() => {
          // Reset button state after request completes
          submitButton.innerHTML = "Submit";
          submitButton.disabled = false;
        });
      // You can now use the input value for further actions
    });

    // Open the modal with your content
    modal.open({
      title: "Genrate AI Text",
      content: container,
    });
  });

  // TODO Remove
  editor.on("load", () =>
    editor.addComponents(
      `<div style="margin:100px; padding:25px;">
            Content loaded from the plugin
        </div>`,
      { at: 0 }
    )
  );
};
