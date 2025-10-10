interface VoteStatsCardProps {
  count: number;
  totalVotes: number;
  colorScheme: 'javascript' | 'typescript';
}

export default function VoteStatsCard({
  count,
  totalVotes,
  colorScheme
}: VoteStatsCardProps) {
  const colors = {
    javascript: {
      borderColor: 'border-yellow-200',
      progressBar: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
      countText: 'text-yellow-600',
      percentageText: 'text-yellow-700'
    },
    typescript: {
      borderColor: 'border-blue-200',
      progressBar: 'bg-gradient-to-r from-blue-500 to-blue-600',
      countText: 'text-blue-600',
      percentageText: 'text-blue-700'
    }
  };

  const currentColors = colors[colorScheme];
  const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;

  return (
    <div className={`w-full bg-white border-2 ${currentColors.borderColor} rounded-xl p-4 lg:p-8 shadow-lg`}>
      <div className="text-center">
        <div className={`text-4xl lg:text-6xl font-bold ${currentColors.countText} mb-3 lg:mb-4`}>
          {count}
        </div>
        <div className="text-base lg:text-lg text-gray-600 mb-4 lg:mb-6">votos recebidos</div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className={`${currentColors.progressBar} h-4 rounded-full transition-all duration-700 shadow-inner`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        
        <div className={`text-sm font-medium ${currentColors.percentageText}`}>
          {percentage}% do total
        </div>
      </div>
    </div>
  );
}