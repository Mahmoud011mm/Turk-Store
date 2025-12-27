import { computed, inject } from '@angular/core';
import { Product } from './models/product';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from './services/toaster';
import { CartItem } from './models/cart';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { signInParams, signUpParams, User } from './models/user';
import { Router } from '@angular/router';
import { Order } from './models/order';
import {withStorageSync} from '@angular-architects/ngrx-toolkit'

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
  loading: boolean;
};

export const EcommerceStor = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    products: [
      {
        id: 1,
        name: 'Wireless Headphones',
        description:
          'High-quality wireless headphones with noise-cancellation and long battery life.',
        price: 59.99,
        imageUrl: 'https://picsum.photos/300/200?random=1',
        rating: 4.5,
        reviewCount: 320,
        inStock: true,
        category: 'Electronics',
      },
      {
        id: 2,
        name: 'Smart Watch',
        description:
          'Waterproof smart watch with heart rate monitor, GPS tracking, and sleep analysis.',
        price: 79.99,
        imageUrl: 'https://picsum.photos/300/200?random=2',
        rating: 4.2,
        reviewCount: 190,
        inStock: false,
        category: 'Wearables',
      },
      {
        id: 3,
        name: 'Bluetooth Speaker',
        description: 'Portable Bluetooth speaker with deep bass and 12-hour battery life.',
        price: 34.99,
        imageUrl: 'https://picsum.photos/300/200?random=3',
        rating: 4.7,
        reviewCount: 510,
        inStock: true,
        category: 'Electronics',
      },
      {
        id: 4,
        name: 'Sports Shoes',
        description: 'Lightweight running shoes with breathable material and shock absorption.',
        price: 49.99,
        imageUrl: 'https://picsum.photos/300/200?random=4',
        rating: 4.0,
        reviewCount: 140,
        inStock: true,
        category: 'Fashion',
      },
      {
        id: 5,
        name: 'Gaming Keyboard',
        description:
          'Mechanical RGB gaming keyboard with customizable lighting and fast switch response.',
        price: 69.99,
        imageUrl: 'https://picsum.photos/300/200?random=5',
        rating: 4.6,
        reviewCount: 260,
        inStock: false,
        category: 'Computers',
      },
      {
        id: 6,
        name: '4K Monitor',
        description: '27-inch UHD monitor with HDR10 and ultra-smooth refresh rate.',
        price: 299.99,
        imageUrl: 'https://picsum.photos/300/200?random=6',
        rating: 4.8,
        reviewCount: 180,
        inStock: true,
        category: 'Computers',
      },
      {
        id: 7,
        name: 'USB-C Power Bank',
        description: 'Fast charging 20,000mAh power bank compatible with all smartphones.',
        price: 24.99,
        imageUrl: 'https://picsum.photos/300/200?random=7',
        rating: 4.3,
        reviewCount: 90,
        inStock: true,
        category: 'Accessories',
      },
      {
        id: 8,
        name: 'DSLR Camera',
        description: 'Professional DSLR camera with 24MP sensor and 4K video recording.',
        price: 499.99,
        imageUrl: 'https://picsum.photos/300/200?random=8',
        rating: 4.7,
        reviewCount: 350,
        inStock: false,
        category: 'Photography',
      },
      {
        id: 9,
        name: 'Office Chair',
        description: 'Ergonomic office chair with lumbar support and adjustable height.',
        price: 129.99,
        imageUrl: 'https://picsum.photos/300/200?random=9',
        rating: 4.4,
        reviewCount: 220,
        inStock: true,
        category: 'Furniture',
      },
      {
        id: 10,
        name: 'Electric Kettle',
        description: '1.7L stainless steel electric kettle with fast boiling feature.',
        price: 19.99,
        imageUrl: 'https://picsum.photos/300/200?random=10',
        rating: 4.1,
        reviewCount: 90,
        inStock: true,
        category: 'Home Appliances',
      },
      {
        id: 11,
        name: 'LED Desk Lamp',
        description: 'Touch-control LED desk lamp with adjustable brightness and color modes.',
        price: 15.99,
        imageUrl: 'https://picsum.photos/300/200?random=11',
        rating: 4.5,
        reviewCount: 160,
        inStock: true,
        category: 'Home',
      },
      {
        id: 12,
        name: 'Portable Hard Drive',
        description: '2TB external hard drive with high-speed USB 3.0 data transfer.',
        price: 79.99,
        imageUrl: 'https://picsum.photos/300/200?random=12',
        rating: 4.6,
        reviewCount: 290,
        inStock: false,
        category: 'Computers',
      },
      {
        id: 13,
        name: "Men's Jacket",
        description: 'Winter waterproof jacket with soft inner lining for warmth.',
        price: 54.99,
        imageUrl: 'https://picsum.photos/300/200?random=13',
        rating: 4.3,
        reviewCount: 120,
        inStock: true,
        category: 'Fashion',
      },
      {
        id: 14,
        name: 'Coffee Maker',
        description: 'Automatic coffee maker with reusable filter and 12-cup capacity.',
        price: 39.99,
        imageUrl: 'https://picsum.photos/300/200?random=14',
        rating: 4.2,
        reviewCount: 85,
        inStock: true,
        category: 'Home Appliances',
      },
      {
        id: 15,
        name: 'Tablet 10-inch',
        description: 'High-resolution 10-inch Android tablet with expandable storage.',
        price: 149.99,
        imageUrl: 'https://picsum.photos/300/200?random=15',
        rating: 4.4,
        reviewCount: 210,
        inStock: true,
        category: 'Electronics',
      },
    ] as Product[],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
  } as EcommerceState),
  withStorageSync({
    key: 'Turk-Store',
    select: ({wishlistItems, cartItems, user}) => ({wishlistItems, cartItems, user})
  }),
  withComputed(({ category, products, wishlistItems, cartItems }) => ({
    filteredProducts: computed(() => {
      const cat = String(category() ?? 'All').toLowerCase();

      if (!cat || cat === 'all') return products();

      return products().filter((p: Product) => String(p.category ?? '').toLowerCase() === cat);
    }),
    wishlistCount: computed(() => wishlistItems().length),
    cartItemsCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
  })),
  withMethods(
    (store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category });
      }),
      addToWishlist: (product: Product) => {
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (draft.findIndex((p) => p.id === product.id)) {
            draft.push(product);
          }
        });

        patchState(store, { wishlistItems: updatedWishlistItems });
        toaster.success('Product added to wishlist');
      },
      removeFromWishlist: (product: Product) => {
        patchState(store, {
          wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
        });
        toaster.success('Product removed from wishlist');
      },
      clearWishlist: () => {
        patchState(store, {
          wishlistItems: [],
        });
      },
      addToCart: (product: Product, quantity = 1) => {
        const existingItemIndex = store.cartItems().findIndex((i) => i.product.id === product.id);

        const updateCartItems = produce(store.cartItems(), (draft) => {
          if (existingItemIndex !== -1) {
            draft[existingItemIndex].quantity += quantity;
          }
          draft.push({ product, quantity });
        });
        patchState(store, { cartItems: updateCartItems });
        toaster.success(
          existingItemIndex !== -1 ? 'Product Added Again' : 'Product Added To the Cart'
        );
      },
      setItemQuantity(params: { productId: number; quantity: number }) {
        const index = store.cartItems().findIndex((c) => c.product.id === params.productId);
        const updated = produce(store.cartItems(), (draft) => {
          draft[index].quantity = params.quantity;
        });
        patchState(store, { cartItems: updated });
      },
      addAllWishlistToCart: () => {
        const updateCartItems = produce(store.cartItems(), (draft) => {
          store.wishlistItems().forEach((p) => {
            if (!draft.find((c) => c.product.id === p.id)) {
              draft.push({ product: p, quantity: 1 });
            }
          });
        });
        patchState(store, { cartItems: updateCartItems, wishlistItems: [] });
      },
      moveToWishlist(product: Product) {
        const updatedCartItems = store.cartItems().filter((p) => p.product.id !== product.id);
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });
        patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishlistItems });
      },
      removeFromCart(product: Product) {
        patchState(store, {
          cartItems: store.cartItems().filter((p) => p.product.id !== product.id),
        });
      },
      proceedToChekout: () => {
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: true,
            },
          });
          return;
        } else {
          router.navigate(['/checkout']);
        }
      },
      placeOrder: async () => {
        patchState(store, { loading: true });
        const user = store.user();

        if (!user) {
          toaster.error('Please login before placing order');
          patchState(store, { loading: false });
          return;
        }

        const order: Order = {
          id: crypto.randomUUID(),
          userId: user.id,
          total: Math.round(
            store.cartItems().reduce((acc, item) => acc + item.quantity * item.product.price, 0)
          ),
          items: store.cartItems(),
          paymentStats: 'success',
        };
        await new Promise((resolve) => setTimeout(resolve, 1000));

        patchState(store, { loading: false, cartItems: [] });
        router.navigate(['order-success']);
      },
      signIn: ({ email, password, checkout, dialogId }: signInParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'medo@gmail.com',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },
      signUp: ({ email, password, name, checkout, dialogId }: signUpParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'medo@gmail.com',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },
      signOut: () => {
        patchState(store, { user: undefined });
      },
    })
  )
);
