export interface PhotoCard {
  id: string;
  description: string;
  image: string;
  createdAt: string;
}
export const PhotoCard = () => {
  // const mockPhoto = {
  //   id: "1",
  //   description: "Sexy text",
  //   image: "https://placekitten.com/50/100",
  //   createdAt: "2021-10-10T00:00:00.000Z",
  // };

  // return (
  //   <div className="flex h-64 w-44 max-w-md flex-col rounded-md bg-gradient-to-b from-blue-300 to-pink-300 p-2 dark:from-blue-800 dark:to-purple-800 ">
  //     <img
  //       src={mockPhoto.image}
  //       alt={mockPhoto.description}
  //       className="overflow-hidden"
  //     />

  //     <div className="mt-8 flex items-center gap-4">
  //       <div>{mockPhoto.description}</div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="w-full max-w-sm lg:flex lg:max-w-full">
      <div
        className="h-48 flex-none overflow-hidden rounded-t bg-cover text-center lg:h-auto lg:w-48 lg:rounded-l lg:rounded-t-none"
        style={{
          backgroundImage: "url('https://placekitten.com/200/300')",
        }}
      ></div>
      <div className="flex flex-col justify-between rounded-b border-b border-l border-r border-gray-400 bg-white p-4 leading-normal lg:rounded-b-none lg:rounded-r lg:border-l-0 lg:border-t lg:border-gray-400">
        <div className="mb-8">
          <p className="flex items-center text-sm text-gray-600">
            <svg
              className="mr-2 h-3 w-3 fill-current text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            Members only
          </p>
          <div className="mb-2 text-xl font-bold text-gray-900">
            Can coffee make you a better developer?
          </div>
          <p className="text-base text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="flex items-center">
          <img
            className="mr-4 h-10 w-10 rounded-full"
            src="https://placekitten.com/200/300"
            alt="Avatar of Jonathan Reinink"
          />
          <div className="text-sm">
            <p className="leading-none text-gray-900">Jonathan Reinink</p>
            <p className="text-gray-600">Aug 18</p>
          </div>
        </div>
      </div>
    </div>
  );
};
