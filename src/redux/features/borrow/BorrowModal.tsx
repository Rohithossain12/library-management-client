import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useBorrowBookMutation } from "@/redux/features/borrow/borrowApi";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { SerializedError } from "@reduxjs/toolkit";

interface Props {
  book: {
    _id: string;
    title: string;
    copies: number;
  };
}

export default function BorrowModal({ book }: Props) {
  const navigate = useNavigate();
  const [borrowBook] = useBorrowBookMutation();

  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const handleBorrow = async () => {
    if (!dueDate) {
      toast.error("Please select a due date.");
      return;
    }
    if (quantity < 1 || quantity > book.copies) {
      toast.error(`Quantity must be between 1 and ${book.copies}.`);
      return;
    }

    try {
      const res = await borrowBook({
        book: book._id,
        quantity,
        dueDate,
      }).unwrap();

      toast.success(res.message || "Book borrowed successfully");
      setOpen(false);
      navigate("/borrow-summary");
    } catch (err) {
      const error = err as SerializedError & { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to borrow book");
    }
  };

 
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = Number(e.target.value);
    if (val < 1) val = 1;
    else if (val > book.copies) val = book.copies;
    setQuantity(val);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          title="Borrow"
          className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
        >
          📚
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            Borrow “{book.title}”
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Quantity</label>
            <Input
              type="number"
              value={quantity}
              min={1}
              max={book.copies}
              onChange={handleQuantityChange}
            />
            <p className="text-xs text-muted-foreground">
              {book.copies} {book.copies === 1 ? "copy" : "copies"} available
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Due Date</label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            onClick={handleBorrow}
            className="w-full bg-green-600 text-white hover:bg-green-700"
          >
            Confirm Borrow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
