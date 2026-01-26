
  

type RowObj = {
	position:number;
	name: string;
	prmerged: string;
	githubid: string;
	points: string;
  avatarUrl: string,
  prDetailsURL: string
};



const tableDataColumns: RowObj[] = [
	{		
		position:1,
		name: 'Akshay Waghmare',
		githubid: 'akshayw1',
		prmerged: '99',
		points: '232', 
        avatarUrl: "string",
        prDetailsURL: "string"
	},
	{
		position:2,
		name:'Shashank Patil',
		githubid: 'shashankpatil28',
		prmerged: '77',
		points: '219', 
        avatarUrl: "string",
        prDetailsURL: "string"
	},
	{
		position:3,
		name:'Shashank Patil',
		githubid: 'shashankpatil28',
		prmerged: '77',
		points: '219', 
        avatarUrl: "string",
        prDetailsURL: "string"
	},
	
];

export default tableDataColumns;
