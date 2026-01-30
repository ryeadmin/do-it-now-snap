import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatProvider } from "@/contexts/ChatContext";
import HomeScreen from "./pages/HomeScreen";
import FeedScreen from "./pages/FeedScreen";
import CreateGameScreen from "./pages/CreateGameScreen";
import ActivityDetailScreen from "./pages/ActivityDetailScreen";
import ChatScreen from "./pages/ChatScreen";
import ChatsListScreen from "./pages/ChatsListScreen";
import ProfileScreen from "./pages/ProfileScreen";
import MatchingScreen from "./pages/MatchingScreen";
import StartNowMatchScreen from "./pages/StartNowMatchScreen";
import DirectChatScreen from "./pages/DirectChatScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ChatProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/feed" element={<FeedScreen />} />
            <Route path="/matching" element={<MatchingScreen />} />
            <Route path="/start-now-match" element={<StartNowMatchScreen />} />
            <Route path="/direct-chat/:id" element={<DirectChatScreen />} />
            <Route path="/create" element={<CreateGameScreen />} />
            <Route path="/activity/:id" element={<ActivityDetailScreen />} />
            <Route path="/chat/:id" element={<ChatScreen />} />
            <Route path="/chats" element={<ChatsListScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ChatProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
