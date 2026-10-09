import { FinanceInfraCanvasTopicChannel } from "@entities/integration/finance-infra";

import type { ChannelRenderer } from "./types.ts";


const DataChannelNode: ChannelRenderer = ({ channel }) => {
    return (
        <FinanceInfraCanvasTopicChannel channel={channel}>
            {channel.topics.map((topic) => (
                <FinanceInfraCanvasTopicChannel.Topic key={topic.id} topic={topic}>
                    <FinanceInfraCanvasTopicChannel.TopicName>
                        {topic.name}
                    </FinanceInfraCanvasTopicChannel.TopicName>
                </FinanceInfraCanvasTopicChannel.Topic>
            ))}
        </FinanceInfraCanvasTopicChannel>
    );
};


export { DataChannelNode };
