type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      <div className="text-xl font-bold">{name}</div>
      <img src={picture} className="w-6 h-6 rounded-full ml-2" alt={name} />
    </div>
  );
};

export default Avatar;
