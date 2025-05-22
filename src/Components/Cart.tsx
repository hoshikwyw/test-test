// Cart.tsx
import React, { useState, useEffect } from "react";
import { type CartItem, type InvoiceData } from "../utils/types";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [taxRate] = useState<number>(0.1); // 10% tax
  const [shippingFee] = useState<number>(5.99); // Flat shipping fee
  const [total, setTotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [invoiceSent, setInvoiceSent] = useState<boolean>(false);
  const [showSellerContact, setShowSellerContact] = useState<boolean>(false);

  // Load cart items from localStorage or API
  useEffect(() => {
    // Mock data - in a real app, this would come from an API or context
    const mockCartItems: CartItem[] = [
      {
        id: "1",
        name: "Wireless Headphones",
        price: 99.99,
        quantity: 1,
        image: "/headphones.jpg",
      },
      {
        id: "2",
        name: "Smart Watch",
        price: 199.99,
        quantity: 2,
        image: "/smartwatch.jpg",
      },
    ];
    setCartItems(mockCartItems);
  }, []);

  // Calculate prices whenever cart items change
  useEffect(() => {
    const newSubtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const newTax = newSubtotal * taxRate;
    const newTotal = newSubtotal + newTax + shippingFee;

    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newTotal);
  }, [cartItems, taxRate, shippingFee]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const generateInvoice = (): InvoiceData => {
    return {
      items: cartItems,
      subtotal,
      tax,
      shipping: shippingFee,
      total,
      customerEmail: email,
      date: new Date().toISOString(),
    };
  };

  const sendInvoice = async () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    try {
      const success = await sendInvoice(generateInvoice());
      if (success) {
        setInvoiceSent(true);
        alert("Invoice sent successfully!");
      } else {
        alert("Failed to send invoice. Please try again.");
      }
    } catch (error) {
      console.error("Error sending invoice:", error);
      alert("An error occurred while sending the invoice.");
    }
  };

  const revealSellerContact = () => {
    if (!invoiceSent) {
      alert("Please send the invoice first");
      return;
    }
    setShowSellerContact(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Cart Items */}
        <div className="md:w-2/3">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center border-b pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 border rounded-l"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 border rounded-r"
                    >
                      +
                    </button>
                  </div>
                  <p className="ml-4 font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="md:w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax ({taxRate * 100}%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {!invoiceSent ? (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium"
                  >
                    Email for invoice
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <button
                  onClick={sendInvoice}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  Send Invoice & Proceed
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-3 bg-green-100 text-green-800 rounded">
                  Invoice sent to {email}
                </div>

                {!showSellerContact ? (
                  <button
                    onClick={revealSellerContact}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                  >
                    Get Seller Contact
                  </button>
                ) : (
                  <div className="mt-4 p-4 bg-gray-100 rounded">
                    <h3 className="font-bold mb-2">Contact the Seller</h3>
                    <p>Email: seller@example.com</p>
                    <p>Phone: (123) 456-7890</p>
                    <p className="mt-2 text-sm text-gray-600">
                      Please contact the seller to complete your purchase and
                      arrange payment.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
