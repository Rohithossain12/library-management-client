import { useAddBookMutation } from "@/redux/features/books/booksApi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useForm,
  type SubmitHandler,
  type FieldValues,
  type FieldErrors,
} from "react-hook-form";
import type { SerializedError } from "@reduxjs/toolkit";

const genreOptions = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

export default function AddBook() {
  const [addBook, { isLoading }] = useAddBookMutation();

  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      genre: "",
      copies: 1,
      description: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await addBook({
        ...data,
        available: data.copies > 0,
      }).unwrap();

      toast.success("Book added successfully!");
      form.reset();
    } catch (err) {
      const error = err as SerializedError & { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to add book");
    }
  };

  const onError = (errors: FieldErrors) => {
    const firstError = Object.values(errors)[0] as { message?: string } | undefined;
    if (firstError?.message) {
      toast.error(firstError.message);
    } else {
      toast.error("Validation failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
        📚 Add New Book
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="bg-white shadow-lg rounded-lg p-6 border space-y-6"
          noValidate
        >
   
          <FormField
            control={form.control}
            name="title"
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter book title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

         
          <FormField
            control={form.control}
            name="author"
            rules={{ required: "Author is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Enter author name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

    
          <FormField
            control={form.control}
            name="isbn"
            rules={{ required: "ISBN is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ISBN number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

         
          <FormField
            control={form.control}
            name="genre"
            rules={{ required: "Genre is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genreOptions.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

       
          <FormField
            control={form.control}
            name="copies"
            rules={{
              required: "Copies is required",
              min: { value: 1, message: "Copies must be at least 1" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copies</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    placeholder="Enter number of copies"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />

         
          <FormField
            control={form.control}
            name="description"
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter book description" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white hover:bg-green-700"
            >
              {isLoading ? "Submitting..." : "Add Book"}
            </Button>
          </div>
        </form>
      </Form>

      <Toaster />
    </div>
  );
}
