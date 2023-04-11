export type VideoData = {
  id: string;
  src: string;
  user_id: string;
  description: string;
};

const data: VideoData[] = [
  {
    id: "zero",
    src: "https://storage.xiaohai-huang.net/random/videos/Did%20you%20know%20you%20are%20using%20these%20right%20now_%20%23shorts.mp4",
    user_id: "xiaohai",
    description: "Short description",
  },
  {
    id: "one",
    src: "https://storage.xiaohai-huang.net/random/videos/yt1s.com%20-%20how%20to%20dry%20a%20cat%20quickly%20after%20bathing%20cats%20shorts.mp4",
    user_id: "xiaohai",
    description: `In addition to indicating that the element is not the target of pointer events, the value none instructs the pointer event to go "through" the element and target whatever is "underneath" that element instead.`,
  },
  {
    id: "two",
    src: "https://storage.xiaohai-huang.net/random/videos/yt1s.com%20-%20Atlas%20%20Up%20Up%20and%20Away.mp4",
    user_id: "xiaohai",
    description: "Short description",
  },
  {
    id: "three",
    src: "https://storage.xiaohai-huang.net/random/videos/The%20People%20Pleaser%20shorts.mp4",
    user_id: "xiaohai",
    description: "Short description",
  },
  {
    id: "four",
    src: "https://storage.xiaohai-huang.net/random/videos/Y2Mate.is%20-%20respect%20%F0%9F%92%AF%F0%9F%98%8D%F0%9F%98%B1%F0%9F%A5%B6-q1tK3aqNxUI-720p-1656406884815.mp4",
    user_id: "xiaohai",
    description: "Short description",
  },
  {
    id: "five",
    src: "https://assets.mixkit.co/videos/preview/mixkit-winter-fashion-cold-looking-woman-concept-video-39874-large.mp4",
    user_id: "xiaohai",
    description: "Short description",
  },
  {
    id: "six",
    src: "https://storage.xiaohai-huang.net/random/videos/Friends%20%E2%9D%A4%EF%B8%8F%F0%9F%98%81%40loganpaulvlogs%20%40FriendlyNeighborhoodEvan.mp4",
    user_id: "xiaohai",
    description: "Short description",
  },
];

export default function getVideos(offset: number = 0) {
  return new Promise<VideoData[]>((resolve) => {
    setTimeout(() => {
      resolve(data.map((item) => ({ ...item, id: `${offset}-${item.id}` })));
    }, 1000);
  });
}
