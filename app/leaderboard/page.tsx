"use client"
import React, {useEffect} from 'react';
import {useState, useMemo} from "react"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from "@/components/ui/table"
import {getLeaderboard, leaderboardItem} from "@/actions/database";
const Page = () => {

    const [selectedLevel, setSelectedLevel] = useState("all")
    const [leaderboard, setLeaderboard] = useState<leaderboardItem[]>([])
    const filteredLeaderboard = useMemo(() => {
        return leaderboard
            .filter((item) => {
                return !(selectedLevel !== "all" && item.level !== selectedLevel);
            })
            .sort((a, b) => {
                let timeA = a.score
                let timeB = b.score

                if (timeA === null) {
                    timeA = 0
                }

                if (timeB === null) {
                    timeB = 0
                }

                return timeB - timeA
            })

    }, [leaderboard, selectedLevel])

    useEffect(() => {
        const fetchLeaderboard  = async () => {
            const data = await getLeaderboard()
            setLeaderboard(data)
            console.log(data)
        }

        fetchLeaderboard()
    }, []);

    return (
        <div className="flex w-screen justify-center mt-20">
            <div className="bg-background rounded-lg border p-6 w-full max-w-4xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Leaderboard</h2>
                    <div className="flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <span>Level</span>
                                    <ChevronsUpDownIcon className="w-4 h-4"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[200px]">
                                <DropdownMenuRadioGroup value={selectedLevel} onValueChange={setSelectedLevel}>
                                    <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="easy">easy</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="medium">medium</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="hard">hard</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Level</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredLeaderboard.map((item) => (
                            <TableRow key={item.rank}>
                                <TableCell className="font-medium">{item.rank}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.score}</TableCell>
                                <TableCell>{item.level}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Page;


function ChevronsUpDownIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m7 15 5 5 5-5"/>
            <path d="m7 9 5-5 5 5"/>
        </svg>
    )
}