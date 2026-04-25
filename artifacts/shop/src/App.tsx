import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ProductDetailPage from "@/pages/product";

const queryClient = new QueryClient();

function Router() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <Switch>
      <Route path="/">
        <Home cartCount={cartCount} setCartCount={setCartCount} />
      </Route>
      <Route path="/product/:id">
        <ProductDetailPage cartCount={cartCount} setCartCount={setCartCount} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
