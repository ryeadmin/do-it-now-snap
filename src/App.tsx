import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import FeedScreen from "./pages/FeedScreen";
import CreateGameScreen from "./pages/CreateGameScreen";
import ActivityDetailScreen from "./pages/ActivityDetailScreen";
import ChatScreen from "./pages/ChatScreen";
import ChatsListScreen from "./pages/ChatsListScreen";
import ProfileScreen from "./pages/ProfileScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/feed" element={<FeedScreen />} />
          <Route path="/create" element={<CreateGameScreen />} />
          <Route path="/activity/:id" element={<ActivityDetailScreen />} />
          <Route path="/chat/:id" element={<ChatScreen />} />
          <Route path="/chats" element={<ChatsListScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
