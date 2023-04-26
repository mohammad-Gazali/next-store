"use client";

import Image from "next/image";
import { useToast } from "./ui/use-toast";
import { ReviewWithUser } from "@/types/db";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { useState } from "react";



const ReviewCard = ({ review, current_user_email }: { review: ReviewWithUser, current_user_email: string }) => {

    const [isLoading, setIsLoading] = useState(false);
    
    const { toast } = useToast();

    const router = useRouter();

	const handleRemoveReview = async () => {
		try {
			
            setIsLoading(true)

			const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/reviews/remove`, {
				method: "POST",
				body: JSON.stringify({
					id: review.id
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
            setIsLoading(false)
        }
	}

	return (
		<div className="flex flex-col gap-2 bg-muted rounded-lg p-3">
			<div className="flex gap-2 items-start">
				<div className="flex-shrink-0">
					<Image
						className="w-10 h-10 rounded-full"
						src={review.user.avatar_url || "/avatar-placeholder.png"}
						alt={review.user.name}
						quality={100}
						width={40}
						height={40}
					/>
				</div>
				<div className="flex-1 min-w-0">
					<p className="text-sm font-medium truncate">
						{
							review.user.email === current_user_email
							?
							"You"
							:
							`
							${review.user.name} 
							${review.user.email 
								?
								<span className="text-primary sm:inline-block hidden">
									({review.user.email})
								</span>
								:
								""
							}
							`
						}
					</p>
					<p className="text-sm text-muted-dark truncate"></p>
					<p className="text-sm text-muted-dark truncate">
						{formatDateReviewCard(review.updated_at)}
					</p>
				</div>
				<div className="flex items-center text-base font-semibold">
					{review.value === 1 ? "one star" : `${review.value} stars`}
				</div>
			</div>
			<div className="flex items-center text-sm px-2">{review.text}</div>
			{
				review.user.email === current_user_email
				?
				<Button isLoading={isLoading} onClick={handleRemoveReview} size="sm" className="ms-2 gap-1 w-fit mt-2" variant="destructive">
					Remove {isLoading ? null : <Trash2 className="w-4 h-4" />}
				</Button>
				:
				null
			}
		</div>
	);
};

function formatDateReviewCard(date: string) {
	const timestamp = new Date(date).getTime();
	return format(timestamp, "yyyy-MM-dd");
}


export default ReviewCard