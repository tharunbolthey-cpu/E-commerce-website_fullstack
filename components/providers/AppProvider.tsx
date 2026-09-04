'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type {
  CartItem,
  Category,
  Order,
  Product,
  Review,
  User,
  WishlistItem,
} from '@/types';

import {
  getCart,
  getCategories,
  getCurrentUser,
  getOrders,
  getProducts,
  getReviews,
  getUsers,
  getWishlist,
  initializeStorage,
  logoutUser,
  saveCart,
  saveCategories,
  saveCurrentUser,
  saveOrders,
  saveProducts,
  saveReviews,
  saveUsers,
  saveWishlist,
} from '@/lib/storage';


const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://127.0.0.1:5000/api/products';
/* =========================================================
   STORE SETTINGS
========================================================= */

export type Currency = 'INR' | 'USD' | 'EUR';

export interface StoreSettings {
  storeName: string;
  currency: Currency;
  lowStock: string;
  emailNotifications: boolean;
  orderNotifications: boolean;
  reviewNotifications: boolean;
  maintenanceMode: boolean;
  showOutOfStock: boolean;
}

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'ATELIER',
  currency: 'INR',
  lowStock: '10',
  emailNotifications: true,
  orderNotifications: true,
  reviewNotifications: true,
  maintenanceMode: false,
  showOutOfStock: false,
};

const SETTINGS_KEY = 'atelier-store-settings';

const SETTINGS_EVENT =
  'atelier-store-settings-changed';

/* =========================================================
   CONTEXT TYPE
========================================================= */

interface AppContextValue {
  ready: boolean;

  products: Product[];
  categories: Category[];
  users: User[];
  cart: CartItem[];
  wishlist: WishlistItem[];
  orders: Order[];
  reviews: Review[];

  currentUser: User | null;

  settings: StoreSettings;

  storeName: string;

  currency: Currency;

  setSettings: (
    settings: StoreSettings
  ) => void;

  refreshSettings: () => void;

  formatPrice: (
    amount: number
  ) => string;

  refresh: () => void;

  addToCart: (
    productId: string,
    quantity?: number
  ) => void;

  updateCartQuantity: (
    productId: string,
    quantity: number
  ) => void;

  removeFromCart: (
    productId: string
  ) => void;

  clearCart: () => void;

  toggleWishlist: (
    productId: string
  ) => void;

  isWishlisted: (
    productId: string
  ) => boolean;

  login: (
    email: string,
    password: string
  ) => User | null;

  register: (
    user: Omit<
      User,
      'id' | 'createdAt' | 'role' | 'active'
    >
  ) => {
    ok: boolean;
    message: string;
  };

  logout: () => void;

  updateUser: (
    patch: Partial<User>
  ) => void;

  createOrder: (
    order: Order
  ) => void;

  updateOrder: (
    id: string,
    patch: Partial<Order>
  ) => void;

  addReview: (
    review: Review
  ) => void;

  updateReview: (
    id: string,
    patch: Partial<Review>
  ) => void;

  deleteReview: (
    id: string
  ) => void;

  updateProduct: (
    product: Product
  ) => void;

  addProduct: (
    product: Product
  ) => void;

  deleteProduct: (
    id: string
  ) => void;

  updateCategory: (
    category: Category
  ) => void;

  addCategory: (
    category: Category
  ) => void;

  deleteCategory: (
    id: string
  ) => void;

  updateUserAdmin: (
    user: User
  ) => void;

  deleteUser: (
    id: string
  ) => void;
}

/* =========================================================
   CONTEXT
========================================================= */

const AppContext =
  createContext<AppContextValue | null>(
    null
  );

/* =========================================================
   PRODUCT NORMALIZER
========================================================= */

const normalizeProduct = (
  product: any
): Product => {
  return {
    ...product,

    /*
     * MongoDB uses _id.
     * Frontend uses id.
     *
     * Always create a frontend id from _id.
     */
    id: String(
      product._id ||
        product.id ||
        ''
    ),

    /*
     * Make sure these values always exist.
     */
    images: Array.isArray(
      product.images
    )
      ? product.images
      : [],

    specifications:
      product.specifications &&
      typeof product.specifications ===
        'object'
        ? product.specifications
        : {},

    price:
      Number(product.price) || 0,

    originalPrice:
      Number(product.originalPrice) || 0,

    discount:
      Number(product.discount) || 0,

    stock:
      Number(product.stock) || 0,

    rating:
      Number(product.rating) || 0,

    reviewCount:
      Number(product.reviewCount) || 0,
  };
};

/* =========================================================
   PROVIDER
========================================================= */

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] =
    useState(false);

  const [products, setProducts] =
    useState<Product[]>([]);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [users, setUsers] =
    useState<User[]>([]);

  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [wishlist, setWishlist] =
    useState<WishlistItem[]>([]);

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [reviews, setReviews] =
    useState<Review[]>([]);

  const [currentUser, setCurrentUser] =
    useState<User | null>(null);

  const [settings, setSettingsState] =
    useState<StoreSettings>(
      DEFAULT_SETTINGS
    );

  /* =======================================================
     SETTINGS
  ======================================================= */

  const refreshSettings = () => {
    if (
      typeof window === 'undefined'
    ) {
      return;
    }

    try {
      const stored =
        localStorage.getItem(
          SETTINGS_KEY
        );

      if (!stored) {
        setSettingsState(
          DEFAULT_SETTINGS
        );
        return;
      }

      const parsed =
        JSON.parse(stored);

      setSettingsState({
        ...DEFAULT_SETTINGS,
        ...parsed,
      });
    } catch (error) {
      console.error(
        'Unable to load store settings:',
        error
      );

      setSettingsState(
        DEFAULT_SETTINGS
      );
    }
  };

  const setSettings = (
    newSettings: StoreSettings
  ) => {
    const safeSettings: StoreSettings = {
      ...DEFAULT_SETTINGS,
      ...newSettings,

      storeName:
        newSettings.storeName
          ?.trim() || 'ATELIER',

      currency:
        newSettings.currency || 'INR',
    };

    setSettingsState(
      safeSettings
    );

    if (
      typeof window !== 'undefined'
    ) {
      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(
          safeSettings
        )
      );

      window.dispatchEvent(
        new CustomEvent(
          SETTINGS_EVENT,
          {
            detail:
              safeSettings,
          }
        )
      );
    }
  };

  /* =======================================================
     FORMAT PRICE
  ======================================================= */

  const formatPrice = (
    amount: number
  ) => {
    const numericAmount =
      Number(amount) || 0;

    const currencyMap: Record<
      Currency,
      string
    > = {
      INR: '₹',
      USD: '$',
      EUR: '€',
    };

    const symbol =
      currencyMap[
        settings.currency
      ];

    return `${symbol}${numericAmount.toLocaleString(
      'en-IN',
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }
    )}`;
  };

  /* =======================================================
     REFRESH
  ======================================================= */

  const refresh = async () => {
  try {
    console.log(
      'Fetching products from:',
      API_URL
    );

    const response =
      await fetch(API_URL, {
        method: 'GET',
        cache: 'no-store',
      });

    console.log(
      'Products API status:',
      response.status
    );

    const contentType =
      response.headers.get(
        'content-type'
      );

    if (!response.ok) {
      let message =
        `Products API returned ${response.status}`;

      if (
        contentType?.includes(
          'application/json'
        )
      ) {
        const errorData =
          await response.json();

        message =
          errorData?.message ||
          message;
      }

      throw new Error(
        message
      );
    }

    if (
      !contentType?.includes(
        'application/json'
      )
    ) {
      throw new Error(
        'Products API did not return JSON.'
      );
    }

    const data =
      await response.json();

    console.log(
      'MongoDB products:',
      data
    );

    if (
      data.success &&
      Array.isArray(
        data.products
      )
    ) {
      const normalizedProducts =
        data.products.map(
          (product: any) =>
            normalizeProduct(
              product
            )
        );

      setProducts(
        normalizedProducts
      );

      saveProducts(
        normalizedProducts
      );
    } else {
      console.warn(
        'Products API returned an unexpected response:',
        data
      );
    }
  } catch (error) {
    /*
     * Do NOT use console.error here.
     *
     * A temporary API connection problem
     * should not make Next.js display
     * a scary console error.
     */

    console.warn(
      'Unable to connect to MongoDB products API. Using local products temporarily.',
      error
    );

    const localProducts =
      getProducts();

    setProducts(
      localProducts.map(
        (product: any) =>
          normalizeProduct(
            product
          )
      )
    );
  }

  /*
   * Load local data.
   */

  setCategories(
    getCategories()
  );

  setUsers(
    getUsers()
  );

  setCart(
    getCart()
  );

  setWishlist(
    getWishlist()
  );

  setOrders(
    getOrders()
  );

  setReviews(
    getReviews()
  );

  setCurrentUser(
    getCurrentUser()
  );
};
  /* =======================================================
     INITIALIZE
  ======================================================= */

  useEffect(() => {
    const initialize =
      async () => {
        initializeStorage();

        await refresh();

        refreshSettings();

        setReady(true);
      };

    initialize();
  }, []);

  /* =======================================================
     SETTINGS EVENT
  ======================================================= */

  useEffect(() => {
    const handleSettingsChange =
      (event: Event) => {
        const customEvent =
          event as CustomEvent<StoreSettings>;

        if (
          customEvent.detail
        ) {
          setSettingsState({
            ...DEFAULT_SETTINGS,
            ...customEvent.detail,
          });
        } else {
          refreshSettings();
        }
      };

    window.addEventListener(
      SETTINGS_EVENT,
      handleSettingsChange
    );

    return () => {
      window.removeEventListener(
        SETTINGS_EVENT,
        handleSettingsChange
      );
    };
  }, []);

  /* =======================================================
     CART
  ======================================================= */

  const addToCart = (
    productId: string,
    quantity = 1
  ) => {
    /*
     * IMPORTANT:
     * Compare against normalized frontend id.
     */
    const product =
      products.find(
        (p) =>
          String(p.id) ===
          String(productId)
      );

    if (!product) {
      console.error(
        'Product not found for cart:',
        productId
      );

      return;
    }

    setCart((prev) => {
      const existing =
        prev.find(
          (item) =>
            String(
              item.productId
            ) ===
            String(productId)
        );

      const nextQuantity =
        Math.min(
          product.stock,
          (existing?.quantity ??
            0) + quantity
        );

      const next = existing
        ? prev.map((item) =>
            String(
              item.productId
            ) ===
            String(productId)
              ? {
                  ...item,
                  productId:
                    String(
                      productId
                    ),
                  quantity:
                    nextQuantity,
                }
              : item
          )
        : [
            ...prev,
            {
              productId:
                String(
                  productId
                ),
              quantity:
                Math.min(
                  product.stock,
                  quantity
                ),
            },
          ];

      saveCart(next);

      return next;
    });
  };

  const updateCartQuantity = (
    productId: string,
    quantity: number
  ) => {
    const product =
      products.find(
        (p) =>
          String(p.id) ===
          String(productId)
      );

    if (!product) {
      return;
    }

    setCart((prev) => {
      const next =
        quantity <= 0
          ? prev.filter(
              (item) =>
                String(
                  item.productId
                ) !==
                String(productId)
            )
          : prev.map(
              (item) =>
                String(
                  item.productId
                ) ===
                String(productId)
                  ? {
                      ...item,
                      quantity:
                        Math.min(
                          product.stock,
                          quantity
                        ),
                    }
                  : item
            );

      saveCart(next);

      return next;
    });
  };

  const removeFromCart = (
    productId: string
  ) => {
    updateCartQuantity(
      productId,
      0
    );
  };

  const clearCart = () => {
    setCart([]);

    saveCart([]);
  };

  /* =======================================================
     WISHLIST
  ======================================================= */

  const toggleWishlist = (
    productId: string
  ) => {
    setWishlist((prev) => {
      const exists =
        prev.some(
          (item) =>
            String(
              item.productId
            ) ===
            String(productId)
        );

      const next = exists
        ? prev.filter(
            (item) =>
              String(
                item.productId
              ) !==
              String(productId)
          )
        : [
            ...prev,
            {
              productId:
                String(
                  productId
                ),
            },
          ];

      saveWishlist(next);

      return next;
    });
  };

  const isWishlisted = (
    productId: string
  ) => {
    return wishlist.some(
      (item) =>
        String(
          item.productId
        ) ===
        String(productId)
    );
  };

  /* =======================================================
     LOGIN
  ======================================================= */

  const login = (
    email: string,
    password: string
  ) => {
    const user =
      users.find(
        (u) =>
          u.email.toLowerCase() ===
            email.toLowerCase() &&
          u.password ===
            password &&
          u.active
      );

    if (!user) {
      return null;
    }

    setCurrentUser(user);

    saveCurrentUser(user);

    return user;
  };

  /* =======================================================
     REGISTER
  ======================================================= */

  const register = (
    data: Omit<
      User,
      'id' | 'createdAt' | 'role' | 'active'
    >
  ) => {
    const exists =
      users.some(
        (u) =>
          u.email.toLowerCase() ===
          data.email.toLowerCase()
      );

    if (exists) {
      return {
        ok: false,
        message:
          'An account with this email already exists.',
      };
    }

    const user: User = {
      ...data,

      id:
        `u-${Date.now()}`,

      createdAt:
        new Date().toISOString(),

      role:
        'customer',

      active:
        true,
    };

    const next = [
      ...users,
      user,
    ];

    setUsers(next);

    saveUsers(next);

    setCurrentUser(user);

    saveCurrentUser(user);

    return {
      ok: true,
      message:
        'Account created successfully.',
    };
  };

  /* =======================================================
     LOGOUT
  ======================================================= */

  const logout = () => {
    logoutUser();

    setCurrentUser(null);
  };

  /* =======================================================
     UPDATE USER
  ======================================================= */

  const updateUser = (
    patch: Partial<User>
  ) => {
    if (!currentUser) {
      return;
    }

    const updated = {
      ...currentUser,
      ...patch,
    };

    const next =
      users.map((user) =>
        user.id === updated.id
          ? updated
          : user
      );

    setUsers(next);

    saveUsers(next);

    setCurrentUser(updated);

    saveCurrentUser(updated);
  };

  /* =======================================================
     ORDERS
  ======================================================= */

  const createOrder = (
    order: Order
  ) => {
    const next = [
      order,
      ...orders,
    ];

    setOrders(next);

    saveOrders(next);
  };

  const updateOrder = (
    id: string,
    patch: Partial<Order>
  ) => {
    const next =
      orders.map((order) =>
        order.id === id
          ? {
              ...order,
              ...patch,
            }
          : order
      );

    setOrders(next);

    saveOrders(next);
  };

  /* =======================================================
     REVIEWS
  ======================================================= */

  const addReview = (
    review: Review
  ) => {
    const next = [
      review,
      ...reviews,
    ];

    setReviews(next);

    saveReviews(next);
  };

  const updateReview = (
    id: string,
    patch: Partial<Review>
  ) => {
    const next =
      reviews.map((review) =>
        review.id === id
          ? {
              ...review,
              ...patch,
            }
          : review
      );

    setReviews(next);

    saveReviews(next);
  };

  const deleteReview = (
    id: string
  ) => {
    const next =
      reviews.filter(
        (review) =>
          review.id !== id
      );

    setReviews(next);

    saveReviews(next);
  };

  /* =======================================================
     PRODUCTS
  ======================================================= */

  const updateProduct = (
    product: Product
  ) => {
    const productId =
      String(
        (product as any)._id ||
          product.id
      );

    const next =
      products.map((item) =>
        String(
          (item as any)._id ||
            item.id
        ) === productId
          ? normalizeProduct(
              product
            )
          : item
      );

    setProducts(next);

    saveProducts(next);
  };

  const addProduct = (
    product: Product
  ) => {
    const normalized =
      normalizeProduct(
        product
      );

    const next = [
      normalized,
      ...products,
    ];

    setProducts(next);

    saveProducts(next);
  };

  const deleteProduct = async (
    id: string
  ) => {
    try {
      const response =
        await fetch(
          `${API_URL}/${id}`,
          {
            method: 'DELETE',
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            'Failed to delete product.'
        );
      }

      setProducts(
        (prev) =>
          prev.filter(
            (product) =>
              String(
                (product as any)._id ||
                  product.id
              ) !==
              String(id)
          )
      );

      const next =
        products.filter(
          (product) =>
            String(
              (product as any)._id ||
                product.id
            ) !==
            String(id)
        );

      saveProducts(next);

      return true;
    } catch (error) {
      console.error(
        'Delete product error:',
        error
      );

      throw error;
    }
  };

  /* =======================================================
     CATEGORIES
  ======================================================= */

  const updateCategory = (
    category: Category
  ) => {
    const next =
      categories.map((item) =>
        item.id === category.id
          ? category
          : item
      );

    setCategories(next);

    saveCategories(next);
  };

  const addCategory = (
    category: Category
  ) => {
    const next = [
      ...categories,
      category,
    ];

    setCategories(next);

    saveCategories(next);
  };

  const deleteCategory = (
    id: string
  ) => {
    const next =
      categories.filter(
        (category) =>
          category.id !== id
      );

    setCategories(next);

    saveCategories(next);
  };

  /* =======================================================
     ADMIN USERS
  ======================================================= */

  const updateUserAdmin = (
    user: User
  ) => {
    const next =
      users.map((item) =>
        item.id === user.id
          ? user
          : item
      );

    setUsers(next);

    saveUsers(next);

    if (
      currentUser?.id ===
      user.id
    ) {
      setCurrentUser(user);

      saveCurrentUser(user);
    }
  };

  const deleteUser = (
    id: string
  ) => {
    const next =
      users.filter(
        (user) =>
          user.id !== id
      );

    setUsers(next);

    saveUsers(next);
  };

  /* =======================================================
     CONTEXT VALUE
  ======================================================= */

  const value =
    useMemo<AppContextValue>(
      () => ({
        ready,

        products,
        categories,
        users,
        cart,
        wishlist,
        orders,
        reviews,

        currentUser,

        settings,

        storeName:
          settings.storeName,

        currency:
          settings.currency,

        setSettings,
        refreshSettings,
        formatPrice,

        refresh,

        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,

        toggleWishlist,
        isWishlisted,

        login,
        register,
        logout,

        updateUser,

        createOrder,
        updateOrder,

        addReview,
        updateReview,
        deleteReview,

        updateProduct,
        addProduct,
        deleteProduct,

        updateCategory,
        addCategory,
        deleteCategory,

        updateUserAdmin,
        deleteUser,
      }),
      [
        ready,
        products,
        categories,
        users,
        cart,
        wishlist,
        orders,
        reviews,
        currentUser,
        settings,
      ]
    );

  return (
    <AppContext.Provider
      value={value}
    >
      {children}
    </AppContext.Provider>
  );
}

/* =========================================================
   USE APP
========================================================= */

export function useApp() {
  const context =
    useContext(AppContext);

  if (!context) {
    throw new Error(
      'useApp must be used inside AppProvider'
    );
  }

  return context;
}