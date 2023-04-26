"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, PlusCircle } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";


const AddReviewDialog = ({ product_id }: { product_id: string }) => {

    const [openState, setOpenState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const { toast } = useToast();

    const handleAddingReview = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);

        setIsLoading(true);

        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/reviews/add`, {
                method: "POST",
                body: JSON.stringify({
                    text: form.get("text"),
                    product: product_id,
                    value: parseInt(form.get("value") as string),
                }),
            })

			const data = await response.json()

			if (response.status !== 200) {
				toast({
					variant: "destructive",
					title: "Uh oh! Something went wrong.",
					description: data.message,
				})
			} else {
				router.refresh()
			}
			
        } catch (error) {

            console.log(error)

        } finally {

            setIsLoading(false);
			setOpenState(false)
        }
    }

	return (
		<Dialog open={openState} onOpenChange={setOpenState}>
			<DialogTrigger asChild>
				<Button variant="success" className="mt-10 gap-2 w-full text-base">
					Add Your Review <PlusCircle />
				</Button>
			</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Adding Review</DialogTitle>
					</DialogHeader>
			        <form onSubmit={handleAddingReview}>
					<div className="grid gap-4 py-4">
						<div className="flex flex-col items-start gap-2">
							<Label htmlFor="text" className="text-right">
								Review
							</Label>
							<Textarea id="text" name="text" className="col-span-3" />
						</div>
						<div className="flex flex-col items-start gap-2">
							<Label htmlFor="value" className="text-right">
								Value
							</Label>
							<Textarea id="value" name="value" className="col-span-3" />
						</div>
					</div>
						<Button isLoading={isLoading} type="submit" className="me-auto gap-1 mt-6">
							Add {isLoading ? null : <Plus className="w-5 h-5" />}
						</Button>
			        </form>
				</DialogContent>
		</Dialog>
	);
};

export default AddReviewDialog;
