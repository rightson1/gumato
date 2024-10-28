import { Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

import { deleteChat, getAllChatsByUserId } from "@/actions/chats";
import { useAuth } from "../provider/AuthProvider";
import chatsGlobalStore from "@/lib/chats-store";
import { toast } from "sonner";
import { Spin } from "../shared/Spinner";
import { cn } from "@/lib/utils";
import { DialogHeader, DialogTitle } from "../ui/dialog";

const Sidebar = () => {
  const [hoveredChatId, setHoveredChatId] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [loadingChatDelete, setLoadingChatDelete] = useState<boolean>(false);
  const { user } = useAuth();

  const { userChats, setUserChats, selectedChat, setSelectedChat }: any =
    chatsGlobalStore();

  const getAllChatsOfAuthenticatedUser = async () => {
    try {
      setLoading(true);

      const response = await getAllChatsByUserId(user?.uid!);

      if (response.success) {
        setUserChats(response.data);
      } else {
        toast.error("Something went wrong!! Please try again!!");
      }
    } catch (error) {
      toast.error("Something went wrong!! Please try again!!");
    } finally {
      setLoading(false);
    }
  };

  const deleteChatHandler = async (chatId: string, event: React.MouseEvent) => {
    event.stopPropagation();

    try {
      setLoadingChatDelete(true);

      const response = await deleteChat(chatId);

      if (response.success) {
        const updatedChatHistory = userChats.filter(
          (chat: any) => chat._id !== chatId
        );

        setUserChats(updatedChatHistory);

        if (selectedChat?._id === chatId) {
          setSelectedChat(null);
        }
      }
    } catch (error: any) {
      toast.error(error.toast);
    } finally {
      setLoadingChatDelete(false);
    }
  };

  useEffect(() => {
    getAllChatsOfAuthenticatedUser();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-3 justify-between  p-4 ">
      <div className="flex-1 overflow-y-auto">
        <DialogHeader
          onClick={() => {
            setSelectedChat(null);
          }}
        >
          <DialogTitle className="flex px-4  items-center gap-2 cursor-pointer text-background border border-border/10 py-4 shadow-md">
            <Plus size={15} />
            <span>New Chat</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 ">
          <h1 className="text-sm  font-bold p-2 text-background">
            Your Chat History
          </h1>

          {loading && <Spin size={19} />}

          {!loading && userChats?.length === 0 && (
            <p className="text-gray-400 text-sm p-2">Nothing to Show</p>
          )}

          {!loading &&
            userChats?.length !== 0 &&
            userChats?.map((chat: any) => (
              <div
                className={cn(
                  "cursor-pointer flex justify-between items-center p-2 hover:bg-gray-500 hover:bg-opacity-30",
                  selectedChat?._id == chat._id &&
                    "bg-gray-600 rounded bg-opacity-30"
                )}
                onMouseEnter={() => setHoveredChatId(chat._id)}
                onMouseLeave={() => setHoveredChatId("")}
                onClick={() => {
                  setSelectedChat(chat);
                }}
              >
                <span className="text-sm text-gray-300">
                  {chat.title.split(" ").length <= 3
                    ? chat.title
                    : chat.title.split(" ").slice(0, 3).join(" ") + " . . . ."}
                </span>

                {hoveredChatId === chat._id &&
                  (loadingChatDelete ? (
                    <Spin size={14} />
                  ) : (
                    <Trash2
                      size={15}
                      className="text-red-400"
                      onClick={(e) => deleteChatHandler(chat._id, e)}
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-1 p-3"></div>
    </div>
  );
};

export default Sidebar;
