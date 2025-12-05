import { Minus, Plus, Trash2, ShoppingBag, X } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useCart } from "@/lib/cart-context";

const FREE_SHIPPING_THRESHOLD = 500;

export function CartDrawer() {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart } = useCart();

  const shippingProgress = Math.min((cart.total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - cart.total;

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="left" className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold" data-testid="text-cart-title">
              سلة التسوق ({cart.itemCount})
            </SheetTitle>
            <Button variant="ghost" size="icon" onClick={closeCart} data-testid="button-close-cart">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </SheetHeader>

        {cart.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2" data-testid="text-empty-cart">سلة التسوق فارغة</h3>
            <p className="text-muted-foreground mb-6">ابدأ بإضافة منتجات إلى سلتك</p>
            <Button onClick={closeCart} data-testid="button-continue-shopping">
              تصفح المنتجات
            </Button>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress */}
            {cart.total < FREE_SHIPPING_THRESHOLD && (
              <div className="px-6 py-4 bg-muted/30">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>أضف {remainingForFreeShipping.toLocaleString()} ج.م للشحن المجاني</span>
                  <span className="font-medium">{Math.round(shippingProgress)}%</span>
                </div>
                <Progress value={shippingProgress} className="h-2" data-testid="progress-shipping" />
              </div>
            )}
            {cart.total >= FREE_SHIPPING_THRESHOLD && (
              <div className="px-6 py-4 bg-green-500/10 text-green-700 dark:text-green-400 text-sm font-medium text-center">
                تهانينا! حصلت على شحن مجاني
              </div>
            )}

            {/* Cart Items */}
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 py-4">
                {cart.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex gap-4 p-4 rounded-xl bg-card border"
                    data-testid={`cart-item-${item.product.id}`}
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.nameAr}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 mb-1" data-testid={`text-item-name-${item.product.id}`}>
                        {item.product.nameAr}
                      </h4>
                      <p className="text-primary font-bold" data-testid={`text-item-price-${item.product.id}`}>
                        {item.product.price.toLocaleString()} ج.م
                      </p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            data-testid={`button-decrease-${item.product.id}`}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium" data-testid={`text-quantity-${item.product.id}`}>
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            data-testid={`button-increase-${item.product.id}`}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeFromCart(item.id)}
                          data-testid={`button-remove-${item.product.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Cart Footer */}
            <div className="p-6 border-t bg-background">
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">المجموع الفرعي</span>
                  <span className="font-medium" data-testid="text-subtotal">{cart.total.toLocaleString()} ج.م</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">الشحن</span>
                  <span className="font-medium text-green-600" data-testid="text-shipping">
                    {cart.total >= FREE_SHIPPING_THRESHOLD ? "مجاني" : "50 ج.م"}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold">الإجمالي</span>
                  <span className="font-bold text-primary" data-testid="text-total">
                    {(cart.total + (cart.total >= FREE_SHIPPING_THRESHOLD ? 0 : 50)).toLocaleString()} ج.م
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full" size="lg" data-testid="button-checkout">
                  إتمام الشراء
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg" 
                  onClick={closeCart}
                  data-testid="button-continue-shopping-footer"
                >
                  متابعة التسوق
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
