import { Link } from "wouter";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { categories } from "@/lib/products-data";

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary text-primary-foreground font-bold text-xl">
                E
              </div>
              <span className="text-xl font-bold">إلكترو ستور</span>
            </div>
            <p className="text-muted-foreground mb-6" data-testid="text-footer-about">
              متجرك الإلكتروني الأول للأجهزة الإلكترونية. نوفر لك أحدث المنتجات بأفضل الأسعار مع ضمان الجودة والخدمة المميزة.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" data-testid="link-social-facebook">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="link-social-twitter">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="link-social-instagram">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="link-social-youtube">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">الفئات</h3>
            <ul className="space-y-3">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/category/${category.id}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-category-${category.id}`}
                  >
                    {category.nameAr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">خدمة العملاء</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-contact">
                  اتصل بنا
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-shipping">
                  الشحن والتوصيل
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-returns">
                  الإرجاع والاستبدال
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-warranty">
                  الضمان
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-faq">
                  الأسئلة الشائعة
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">النشرة البريدية</h3>
            <p className="text-muted-foreground mb-4">
              اشترك للحصول على أحدث العروض والخصومات
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="بريدك الإلكتروني" 
                className="flex-1"
                data-testid="input-newsletter"
              />
              <Button type="submit" data-testid="button-subscribe">
                اشترك
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+966 50 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>info@electrostore.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span> جمهورية مصر العربية شربين كفر الترعة الجديد</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Payment Methods & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
          2024. جميع الحقوق محفوظة faris store
          </p>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">طرق الدفع:</span>
            <div className="flex gap-2">
              <div className="w-12 h-8 rounded bg-muted flex items-center justify-center text-xs font-medium">
                Visa
              </div>
              <div className="w-12 h-8 rounded bg-muted flex items-center justify-center text-xs font-medium">
                MC
              </div>
              <div className="w-12 h-8 rounded bg-muted flex items-center justify-center text-xs font-medium">
                مدى
              </div>
              <div className="w-12 h-8 rounded bg-muted flex items-center justify-center text-xs font-medium">
                Apple
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
