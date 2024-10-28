"use client";

import { useEffect, useState } from "react";
import { Send, LoaderCircle } from "lucide-react";

import { useChat } from "ai/react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import Messages from "./Messages";
import { createNewChat, updateChat } from "./../../actions/chats";
import chatsGlobalStore from "@/lib/chats-store";
import { useAuth } from "../provider/AuthProvider";
import { toast } from "sonner";

const ChatArea = () => {
  const [
    showSidebarOnMobileResponsiveness,
    setShowSidebarOnMobileResponsiveness,
  ] = useState(false);

  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    api: "api/chat",
    initialMessages: [],
  });

  const { selectedChat, setSelectedChat, userChats, setUserChats }: any =
    chatsGlobalStore();

  const { user } = useAuth();

  const createOrUpdateChat = async () => {
    try {
      if (!selectedChat) {
        const response = await createNewChat({
          user: user?.uid,
          messages: messages,
          title: messages[0].content,
        });

        if (response?.success) {
          setSelectedChat(response?.data);

          setUserChats([response?.data, ...userChats]);
        }
      } else {
        await updateChat({
          chatId: selectedChat?._id,
          messagesArray: messages,
        });

        const updatedChats = userChats.map((chat: any) =>
          chat._id === selectedChat._id ? { ...chat, messages } : chat
        );

        setUserChats(updatedChats);
      }
    } catch (error: any) {
      toast.error("Something went wrong! Please try again!");
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      createOrUpdateChat();
    }
  }, [messages]);

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat?.messages);
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  return (
    <div className="flex flex-col flex-1 p-5 overflow-y-auto">
      <div className="flex justify-between ">
        <div className="flex justify-center items-center gap-2">
          <Drawer direction="left">
            <DrawerTrigger className="">
              <Menu />
            </DrawerTrigger>
            <DrawerContent className=" w-[250px] h-screen bg-primary py-10 border-none rounded-none">
              <Sidebar />
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <div className="flex flex-col flex-1 justify-between ">
        <div className="">
          <Messages messages={messages} isLoading={isLoading} />
        </div>

        <form onSubmit={handleSubmit} className="relative mt-3 ">
          <div className="flex items-center rounded gap-2 focus-within:border focus-within:outline-none ">
            <textarea
              name="prompt"
              value={input}
              onChange={handleInputChange}
              id="input"
              placeholder="Enter your prompt..."
              className="text-sm p-5 w-full rounded-l focus:outline-none resize-none"
              style={{ flex: 1, maxHeight: "100px", overflowY: "auto" }}
              rows={1}
            />

            {isLoading ? (
              <LoaderCircle className=" transition-all animate-spin duration-150 p-3" />
            ) : (
              <button
                type="submit"
                // disabled={!input.trim()}
                className="flex bg-primary text-background px-2 py-4 rounded-md"
              >
                {/* <Send
                  className={`ml-3 text-background ${
                    !input.trim() ? " cursor-not-allowed" : "cursor-pointer"
                  }`}
                /> */}
                Send
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
