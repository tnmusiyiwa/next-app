import React from "react";

interface Props {
  params: {slug: string[]};
  searchParams: {sortOrder: string};
}

const ProductPage = ({params: {slug}, searchParams: {sortOrder}}: Props) => {
  return (
    <div>
      ProductPage
      {slug}
      <p>{sortOrder}</p>
    </div>
  );
};

export default ProductPage;
