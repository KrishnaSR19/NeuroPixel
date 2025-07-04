import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type TransformationType = keyof typeof transformationTypes;

type SearchParamProps = {
  params: { type: TransformationType } | Promise<{ type: TransformationType }>;
};
const AddTransformationTypePage = async ({ params }: SearchParamProps) => {
  // Await params if it is a Promise
  const resolvedParams = await params;
  const { type } = resolvedParams;
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const transformation = transformationTypes[type];

  const user = await getUserById(userId);

  if (!transformation) {
    return <div>Transformation type not found</div>;
  }
  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;
