export const productTableColumns = [
  {
    dataField: "_id",
    text: "Mã sản phẩm",
  },
  {
    dataField: "title",
    text: "Tên sản phẩm",
    sort: true,
  },
  {
    dataField: "price",
    text: "Giá bán",
    sort: true,
  },
  {
    dataField: "description",
    text: "Mô tả",
    sort: true,
  },
  {
    dataField: "mount",
    text: "Số lượng còn",
    sort: true,
  },
];

export const userTableColumns = [
  {
    dataField: "_id",
    text: "Mã người dùng",
  },
  {
    dataField: "name",
    text: "Tên",
    sort: true,
  },
  {
    dataField: "email",
    text: "Email",
    sort: true,
  },
  {
    dataField: "doB",
    text: "Ngày sinh",
    sort: true,
  },
  {
    dataField: "point",
    text: "Tích điểm",
    sort: true,
  },
];

export const eventTableColumns = [
  {
    dataField: "_id",
    text: "Mã sự kiện",
  },
  {
    dataField: "title",
    text: "Tên sự kiện",
    sort: true,
  },
  {
    dataField: "startDate",
    text: "Ngày bắt đầu",
    sort: true,
  },
  {
    dataField: "endDAte",
    text: "Ngày kết thúc",
    sort: true,
  },
  {
    dataField: "coupon",
    text: "Mã khuyến mãi",
    sort: true,
  },
  {
    dataField: "description",
    text: "Mô tả sự kiện",
    sort: true,
  },
];

export const orderTableColumns = [
  {
    dataField: "_id",
    text: "Mã đơn hàng",
  },
  {
    dataField: "name",
    text: "Tên người mua",
    sort: true,
  },
  {
    dataField: "number",
    text: "Số điệnt thoại",
    sort: true,
  },
  {
    dataField: "email",
    text: "Email",
    sort: true,
  },
  {
    dataField: "address",
    text: "Địa chỉ",
    sort: true,
  },
  {
    dataField: "approve",
    text: "Xác nhận",
    sort: true,
  },
];
