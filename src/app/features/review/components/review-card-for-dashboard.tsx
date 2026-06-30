type ReviewCardForDashboardProps = {
  review: {
    text: string;
    rating: number;
  };
};

export default function ReviewCardForDashboard({ review }: ReviewCardForDashboardProps) {
  return (
    <div className='flex flex-col gap-2 p-4 border bg-emerald-100'>
      <span>Оценка: {review.rating}</span>
      <div>{review.text}</div>
    </div>
  );
}
