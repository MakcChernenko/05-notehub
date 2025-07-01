interface OrderFormProps {
  onSubmit: (value: string) => void;
}

const OrderForm = ({ onSubmit }: OrderFormProps) => {
  const handleSubmit = (formData: FormData) => {
    const userName = formData.get('userName') as string;
    if (userName === '') {
      alert('Please enter search topic!');
      return;
    }
    onSubmit(userName);
  };
  return (
    <form action={handleSubmit}>
      <input type="text" name="userName" />
      <button type="submit">Submit</button>
    </form>
  );
};
export default OrderForm;
