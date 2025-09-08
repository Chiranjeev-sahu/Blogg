import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

// This component is a wrapper around the TinyMCE Rich Text Editor.
// It's designed to be used within a react-hook-form form.
export default function RTE({
    name, // The name of the field in the form.
    control, // The control object from react-hook-form's useForm hook.
    label, // An optional label to display above the editor.
    defaultValue = "" // A default value for the editor content.
}) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            {/* 
              The Controller component from react-hook-form is used to integrate external 
              controlled components (like this rich text editor) into the form.
              It handles the registration, value, and change events for the field.
            */}
            <Controller
                name={name || "content"}
                control={control}
                // The render prop provides the 'field' object, which contains 'onChange', 'onBlur', 'value', etc.
                render={({ field: { onChange } }) => (
                    <Editor
                        initialValue={defaultValue}
                        init={{
                            // Configuration options for the TinyMCE editor.
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        // This is the crucial part for connecting the editor to the form.
                        // When the content of the editor changes, this function is called.
                        // We pass the 'onChange' function from the Controller's 'field' object to it.
                        // This updates the state of the form field in react-hook-form.
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}
