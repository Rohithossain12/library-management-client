import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";

import type { IBook } from "@/redux/features/books/bookTypes";
import { useUpdateBookMutation } from "@/redux/features/books/booksApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 

interface EditBookModalProps {
  book: IBook;
}

type GenreType = "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";

type FormValues = Omit<IBook, "_id">;

export default function EditBookModal({ book }: EditBookModalProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: book.title,
      author: book.author,
      genre: book.genre as GenreType,
      isbn: book.isbn,
      copies: book.copies,
      available: book.available,
    },
  });

  const [updateBook] = useUpdateBookMutation();


  const onInvalid = (errs: FieldErrors<FormValues>) => {
    const firstErr = Object.values(errs)[0];
    if (firstErr?.message) {
      toast.error(firstErr.message as string);
    } else {
      toast.error("Please fix the highlighted fields.");
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await updateBook({ id: book._id, ...data }).unwrap();
      toast.success("Book updated successfully ");
      setOpen(false);
    } catch (err) {
      toast.error("Failed to update book ");
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-green-600 hover:text-green-800"
          title="Edit"
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-4">
        
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-600 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

       
          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              {...register("author", { required: "Author is required" })}
            />
            {errors.author && (
              <p className="text-red-600 text-xs mt-1">{errors.author.message}</p>
            )}
          </div>

        
          <div>
            <Label>Genre</Label>
            <Select
              defaultValue={book.genre as GenreType}
              onValueChange={(val: GenreType) => setValue("genre", val, { shouldValidate: true })}
            >
              <SelectTrigger id="genre" className="w-full">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "FICTION",
                  "NON_FICTION",
                  "SCIENCE",
                  "HISTORY",
                  "BIOGRAPHY",
                  "FANTASY",
                ].map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.genre && (
              <p className="text-red-600 text-xs mt-1">{errors.genre.message}</p>
            )}
          </div>

        
          <div>
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              {...register("isbn", { required: "ISBN is required" })}
            />
            {errors.isbn && (
              <p className="text-red-600 text-xs mt-1">{errors.isbn.message}</p>
            )}
          </div>

         
          <div>
            <Label htmlFor="copies">Copies</Label>
            <Input
              id="copies"
              type="number"
              min={1}
              {...register("copies", {
                required: "Copies is required",
                valueAsNumber: true,
                min: { value: 1, message: "Copies must be at least 1" },
              })}
            />
            {errors.copies && (
              <p className="text-red-600 text-xs mt-1">{errors.copies.message}</p>
            )}
          </div>

       
          <div className="flex items-center gap-2">
            <input
              id="available"
              type="checkbox"
              className="size-4 accent-green-600"
              {...register("available")}
            />
            <Label htmlFor="available" className="select-none">
              Available
            </Label>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {isSubmitting ? "Updating..." : "Update Book"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
