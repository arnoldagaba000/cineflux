import { Card, CardContent } from "@/components/ui/card";

interface MovieDetailNoticeProps {
    message: string;
}

const MovieDetailNotice = ({ message }: MovieDetailNoticeProps) => {
    return (
        <Card className="border border-zinc-800 bg-zinc-900/70 py-0">
            <CardContent className="py-4 text-sm text-zinc-500">
                {message}
            </CardContent>
        </Card>
    );
};

export default MovieDetailNotice;
