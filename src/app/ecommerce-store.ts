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
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { AddReviewParams, UserReview } from './models/user-review';

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
  loading: boolean;
  selectedProductId: string | undefined;
  writeReview: boolean;
};

export const EcommerceStor = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    products: [
      {
        id: 1,
        name: 'Laptop Pro 15',
        description: 'High-performance laptop for professionals.',
        price: 1800,
        imageUrl:
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&h=300&q=80',
        rating: 4.8,
        reviewCount: 1,
        inStock: true,
        category: 'Electronics',
        reviews: [
          {
            id: 'r1',
            productId: '1',
            userName: 'Ahmed Ali',
            userImageUrl: 'https://i.pravatar.cc/150?img=1',
            rating: 5,
            title: 'Excellent',
            comment: 'Very fast and reliable.',
            reviewDate: new Date('2025-01-01'),
          },
        ],
      },
      {
        id: 2,
        name: 'Laptop Air 13',
        description: 'Lightweight laptop with long battery life.',
        price: 1300,
        imageUrl:
          'https://images.unsplash.com/photo-1587825140708-2c77b253dc3c?auto=format&fit=crop&w=400&h=300&q=80',
        rating: 4.5,
        reviewCount: 1,
        inStock: true,
        category: 'Electronics',
        reviews: [
          {
            id: 'r2',
            productId: '2',
            userName: 'Mohamed Hassan',
            userImageUrl: 'https://i.pravatar.cc/150?img=2',
            rating: 4,
            title: 'Good choice',
            comment: 'Very portable.',
            reviewDate: new Date('2025-01-02'),
          },
        ],
      },
      {
        id: 3,
        name: 'Gaming Mouse X',
        description: 'High precision gaming mouse.',
        price: 80,
        imageUrl:
          'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=400&h=300&q=80',
        rating: 4.7,
        reviewCount: 1,
        inStock: true,
        category: 'Accessories',
        reviews: [
          {
            id: 'r3',
            productId: '3',
            userName: 'Omar Adel',
            userImageUrl: 'https://i.pravatar.cc/150?img=3',
            rating: 5,
            title: 'Perfect',
            comment: 'Very accurate.',
            reviewDate: new Date('2025-01-03'),
          },
        ],
      },
      {
        id: 4,
        name: 'Mechanical Keyboard RGB',
        description: 'Mechanical keyboard with RGB lighting.',
        price: 150,
        imageUrl:
          'https://images.unsplash.com/photo-1606813905550-fc1aeeff01a5?auto=format&fit=crop&w=400&h=300&q=80',
        rating: 4.9,
        reviewCount: 1,
        inStock: true,
        category: 'Accessories',
        reviews: [
          {
            id: 'r4',
            productId: '4',
            userName: 'Nour Ibrahim',
            userImageUrl: 'https://i.pravatar.cc/150?img=4',
            rating: 5,
            title: 'Amazing',
            comment: 'Great typing experience.',
            reviewDate: new Date('2025-01-04'),
          },
        ],
      },
      {
        id: 5,
        name: 'Wireless Headphones',
        description: 'Noise isolating headphones.',
        price: 220,
        imageUrl:
          'https://images.unsplash.com/photo-1580894894513-6328b3c9d7b4?auto=format&fit=crop&w=400&h=300&q=80',
        rating: 4.3,
        reviewCount: 1,
        inStock: true,
        category: 'Audio',
        reviews: [
          {
            id: 'r5',
            productId: '5',
            userName: 'Youssef Khaled',
            userImageUrl: 'https://i.pravatar.cc/150?img=5',
            rating: 4,
            title: 'Good sound',
            comment: 'Comfortable.',
            reviewDate: new Date('2025-01-05'),
          },
        ],
      },
      {
        id: 6,
        name: 'Smart Watch GT',
        description: 'Smart watch with fitness tracking.',
        price: 300,
        imageUrl:
          'https://images.unsplash.com/photo-1603791452906-3d1238d6d228?auto=format&fit=crop&w=400&h=300&q=80',
        rating: 4.6,
        reviewCount: 1,
        inStock: true,
        category: 'Wearables',
        reviews: [
          {
            id: 'r6',
            productId: '6',
            userName: 'Mai Samir',
            userImageUrl: 'https://i.pravatar.cc/150?img=6',
            rating: 5,
            title: 'Very useful',
            comment: 'Accurate tracking.',
            reviewDate: new Date('2025-01-06'),
          },
        ],
      },
      {
        id: 7,
        name: 'Bluetooth Speaker',
        description: 'Portable speaker.',
        price: 120,
        imageUrl:
          'https://images.unsplash.com/photo-1594737625785-cf41d46ed47b?auto=format&fit=crop&w=400&h=300&q=80',
        rating: 4.4,
        reviewCount: 1,
        inStock: true,
        category: 'Audio',
        reviews: [
          {
            id: 'r7',
            productId: '7',
            userName: 'Hany Mostafa',
            userImageUrl: 'https://i.pravatar.cc/150?img=7',
            rating: 4,
            title: 'Nice',
            comment: 'Good bass.',
            reviewDate: new Date('2025-01-07'),
          },
        ],
      },
      {
        id: 8,
        name: '4K Monitor 27',
        description: 'Ultra HD monitor.',
        price: 550,
        imageUrl:
          'https://images.unsplash.com/photo-1517336714731-490691fd1ca8?auto=format&fit=crop&w=400&h=300&q=80',
        rating: 4.8,
        reviewCount: 1,
        inStock: true,
        category: 'Monitors',
        reviews: [
          {
            id: 'r8',
            productId: '8',
            userName: 'Reem Ashraf',
            userImageUrl: 'https://i.pravatar.cc/150?img=8',
            rating: 5,
            title: 'Sharp',
            comment: 'Excellent display.',
            reviewDate: new Date('2025-01-08'),
          },
        ],
      },
      {
        id: 9,
        name: 'Office Chair Ergonomic',
        description: 'Comfortable office chair.',
        price: 400,
        imageUrl:
          'https://images.unsplash.com/photo-1598300054421-c6c0a3d3b89f?auto=format&fit=crop&w=400&h=300&q=80',
        rating: 4.5,
        reviewCount: 1,
        inStock: true,
        category: 'Furniture',
        reviews: [
          {
            id: 'r9',
            productId: '9',
            userName: 'Karim Nabil',
            userImageUrl: 'https://i.pravatar.cc/150?img=9',
            rating: 4,
            title: 'Comfortable',
            comment: 'Good support.',
            reviewDate: new Date('2025-01-09'),
          },
        ],
      },
      {
        id: 10,
        name: 'External SSD 1TB',
        description: 'High speed storage.',
        price: 200,
        imageUrl:
          'https://images.unsplash.com/photo-1587202372775-7181d3a56459?auto=format&fit=crop&w=400&h=300&q=80',
        rating: 4.9,
        reviewCount: 1,
        inStock: true,
        category: 'Storage',
        reviews: [
          {
            id: 'r10',
            productId: '10',
            userName: 'Salma Fathy',
            userImageUrl: 'https://i.pravatar.cc/150?img=10',
            rating: 5,
            title: 'Fast',
            comment: 'Very quick transfers.',
            reviewDate: new Date('2025-01-10'),
          },
        ],
      },
    ] as Product[],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectedProductId: undefined,
    writeReview: false,
  } as EcommerceState),
  withStorageSync({
    key: 'Turk-Store',
    select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user }),
  }),
  withComputed(({ category, products, wishlistItems, cartItems, selectedProductId }) => ({
    filteredProducts: computed(() => {
      const cat = String(category() ?? 'All').toLowerCase();

      if (!cat || cat === 'all') return products();

      return products().filter((p: Product) => String(p.category ?? '').toLowerCase() === cat);
    }),
    wishlistCount: computed(() => wishlistItems().length),
    cartItemsCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
    selectedProduct: computed(() => products().find((p) => p.id === Number(selectedProductId()))),
  })),
  withMethods(
    (store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category });
      }),
      setProductId: signalMethod<string>((productId: string) => {
        patchState(store, { selectedProductId: productId });
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
      showWriteReview: () => {
        patchState(store, { writeReview: true });
      },
      hideWriteReview: () => {
        patchState(store, { writeReview: false });
      },
      addReview: async ({title, comment, rating }: AddReviewParams) => {
        patchState(store, {loading:true});
        const product = store.products().find( (p) => p.id === Number(store.selectedProductId()));
        if(!product) {
          patchState(store, {loading:false});
          return;
        }

        const review: UserReview = {
          id: crypto.randomUUID(),
          title,
          comment,
          rating,
          productId: product.id.toString(),
          userName: store.user()?.name || 'Guest',
          userImageUrl: store.user()?.imageUrl || '',
          reviewDate: new Date(),
        }

        const updatedProducts = produce(store.products(), (draft) => {
          const index = draft.findIndex( (p) => p.id === product.id);
          draft[index].reviews.push(review);
          draft[index].rating = Math.round(
            (draft[index].reviews.reduce( (acc, r) => acc + r.rating, 0) / draft[index].reviews.length)*10
          ) / 10;
          draft[index].reviewCount = draft[index].reviews.length;
        });

        await new Promise( (resolve) => setTimeout(resolve, 1000));
        patchState( store, {loading: false, products: updatedProducts, writeReview: false} )
        
      }
    })
  )
);
