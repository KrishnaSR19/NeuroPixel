import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";

type TransformationType = keyof typeof transformationTypes;

type SearchParamProps = {
  params: { type: TransformationType } | Promise<{ type: TransformationType }>;
};

const AddTransformationTypePage = async ({ params }: SearchParamProps) => {
  // Await params if it is a Promise
  const resolvedParams = await params;
  const { type } = resolvedParams;

  const transformation = transformationTypes[type];

  if (!transformation) {
    return <div>Transformation type not found</div>;
  }

  return (
    <>
    <Header title={transformation.title} subtitle={transformation.subTitle} />

    <TransformationForm/>
    </>
  );
};

export default AddTransformationTypePage;
