import Link from "next/link";
export default function BookCard({ b }) {
  const out = b.copies < 1;
  return (
    <div data-aos="fade-up" className="lift card bg-base-100 shadow-md h-full overflow-hidden rounded-2xl">
      <figure className="relative h-72 bg-base-300">
        <img src={b.image} alt={b.title} className={`h-full w-full object-cover ${out ? "opacity-60" : ""}`} />
        <span className="badge badge-primary absolute top-4 left-4 py-3 px-3">{b.category}</span>
        <span className={`badge absolute top-4 right-4 py-3 px-3 ${out ? "badge-error" : "bg-base-100 border-base-300"}`}>
          {out ? "Not Available" : `${b.copies} left`}
        </span>
      </figure>
      <div className="card-body p-6 gap-1">
        <h3 className="card-title text-lg line-clamp-1">{b.title}</h3>
        <p className="text-sm opacity-70">by {b.author}</p>
        <div className="card-actions mt-auto pt-4"><Link href={`/books/${b._id}`} className="btn btn-primary w-full">View Details</Link></div>
      </div>
    </div>
  );
}