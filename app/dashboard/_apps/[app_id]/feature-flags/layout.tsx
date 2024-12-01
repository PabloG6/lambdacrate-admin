
export default async function Layout({
  params,
  children
}: {
  params: { app_id: string };
  children: React.ReactNode
}) {

  return (
    <>
       {children}</>
   
  );
}
