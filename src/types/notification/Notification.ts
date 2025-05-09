export interface NotificationProps {
    $id?: string;
    $createdAt?: string;
    $updatedAt?: string;
    message?: string;
    link?: string;
    notificationType?: 'order' | 'transaction' | 'subscription' | 'message';
    hasBeenRead?: boolean;
}