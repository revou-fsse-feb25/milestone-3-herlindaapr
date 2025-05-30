export interface DataProduct {
    id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  categoryId: number;
  images: string[];
}

export interface DataCategory {
    id: number;
    name: string;
    slug: string;
    image: string;
};

export interface DashboardStat {
    name: string;
    value: string | number;
    change: string;
    changeType: "increase" | "decrease" | "neutral";
    icon: React.ReactNode;
  }
  
export interface NavItem {
    name: string;
    href: string;
    icon: React.ReactNode;
  }

  export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar: string;
    creationAt: string;
    updatedAt: string;
  }