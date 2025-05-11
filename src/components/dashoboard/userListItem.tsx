const UserListItem = ({
  name,
  score,
  image,
}: {
  name: string;
  score: number;
  image: string;
}) => (
  <li className="flex items-center py-3">
    <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
      <img
        src={image}
        alt={`${name} profile`}
        className="h-full w-full object-cover"
      />
    </div>
    <span className="text-gray-600 flex-1">{name}</span>
    <span className="ml-auto mr-2 font-semibold text-gray-700">{score.toFixed(1)}</span>
  </li>
);
export default UserListItem;
