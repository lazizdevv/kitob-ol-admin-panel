// import React from "react";
// import { useAdminDelete } from "../../service/mutation/useAdminDelete";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Card, Button } from "antd"; // Import Ant Design components

// export const ListCard = ({ role }) => {
//   const { mutate, error, isPending } = useAdminDelete();

//   const handleDelete = (id) => {
//     mutate(id, {
//       onSuccess: () => {
//         toast.success("Admin muvaffaqiyatli o'chirildi!");
//       },
//       onError: () => {
//         toast.error(error.message);
//       },
//     });
//   };

//   return (
//     <Card
//       key={role.id}
//       className="mb-4"
//       hoverable
//       cover={
//         <div className="flex justify-center">
//           <img
//             className="w-20 h-20 object-cover rounded-lg"
//             src={role?.image_url || "https://via.placeholder.com/80"}
//             alt="Admin Avatar"
//           />
//         </div>
//       }
//     >
//       <div className="text-end">
//         <Link to={`/super-admin/detail-page/${role.id}`}>
//           <h1 className="underline text-blue-400 font-semibold">
//             ko'proq ko'rish
//           </h1>
//         </Link>
//       </div>
//       <p className="font-bold">Email: {role.email}</p>
//       <p>Role: {role.role}</p>

//       <div className="mt-4 flex justify-between">
//         {role.role === "superadmin" ? (
//           ""
//         ) : (
//           <Button
//             type="primary"
//             danger
//             onClick={() => handleDelete(role.id)}
//             loading={isPending}
//           >
//             Delete
//           </Button>
//         )}
//       </div>
//     </Card>
//   );
// };
