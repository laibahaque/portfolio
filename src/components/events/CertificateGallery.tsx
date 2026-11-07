import { certifications } from "@/data/certifications";

export function CertificateGallery() {
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2">
      {certifications.map((item) => (
        <li key={item.id} className="border border-ink/10 p-5">
          <p className="text-lg tracking-[-0.02em]">{item.title}</p>
          <p className="mt-2 text-sm text-ink-soft">
            {item.issuer}
            <span aria-hidden="true"> · </span>
            {item.issued}
          </p>
          <p className="mt-3 text-sm text-muted">
            Certificate files can be placed under public/certificates when you are ready to link them.
          </p>
        </li>
      ))}
    </ul>
  );
}
