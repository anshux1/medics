import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";

export default function CreateInstitute({ step }: { step: number }) {
  return (
    <div
      className={`${step === 1 ? "hidden" : "block"} my-10 max-w-xl space-y-4`}
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="email"
          placeholder="XYZ Coaching Center"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="A description of the institute and its purpose."
          className="min-h-20"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="xyz@example.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="city">City</Label>
        <Input id="city" type="email" placeholder="Patna" required />
      </div>
    </div>
  )
}
