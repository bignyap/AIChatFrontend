const api_paths = {
    "chatService": {
        "createThread": "/thread/create_chat_thread",
        "listThreads": "/thread/list_chat_thread",
        "deleteThread": "/thread/delete_chat_thread",
        "updateThread": "/thread/update_chat_thread",
        "createMessage": "/chat/create_chat_message",
        "getMessages": "/chat/get_chat_messages",
        "getDefaultModel": "/chat/get_default_chat_model",
        "updateDefaultModel": "/chat/update_default_chat_model",
        "listPrompts": "/prompt/list_user_prompt",
        "getDefaultPrompt": "/prompt/get_default_user_prompt",
        "updateDefaultPrompt": "/prompt/update_default_user_prompt",
        "createPrompt": "/prompt/create_user_prompt"
    }
};

export default api_paths;