import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid';
import Navbar from '../navbar/Navbar';

const features = [
  {
    name: 'Push to deploy.',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: 'https://comicsense.b-cdn.net/storage/2023/10/hawaiian-shirtrts-1.jpg', // Replace with the actual URL
  },
  {
    name: 'SSL certificates.',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: 'https://comicsense.b-cdn.net/storage/2023/11/banbnr-tees.jpg', // Replace with the actual URL
  },
  {
    name: 'Database backups.',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: 'https://comicsense.b-cdn.net/storage/2023/11/banner.jpg', // Replace with the actual URL
  },
  {
    name: 'Database backups.',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: 'https://otakukulture.in/wp-content/uploads/2023/06/Sticker.webp', // Replace with the actual URL
  },
];

export default function Landing() {
  return (
    <div className="relative overflow-hidden" >
       <Navbar />
      <div className="flex">
        {features.map((feature, index) => (
          <div key={feature.name} className="w-1/4">
            <img src={feature.icon} alt={feature.name} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
     
    </div>
  );
}
