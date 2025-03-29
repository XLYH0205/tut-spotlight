import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Loader from '@/components/Loader'
import { COLORS } from '@/constants/theme'
import { styles } from '@/styles/notifications.styles'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { Image } from 'expo-image'
import { formatDistanceToNow } from 'date-fns'

export default function Notifications() {
  const notifications = useQuery(api.notifications.getNotifications)
  if (notifications === undefined) return <Loader />
  if (notifications.length === 0) return <NoNotificationsFound />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

function NoNotificationsFound() {
  return (
    <View
      style={[styles.container, styles.centered]}
    >
      <Ionicons name="notifications-outline" size={48} color={COLORS.primary} />
      <Text style={{ color: COLORS.white, fontSize: 20 }}>No notifications yet</Text>
    </View>
  )
}

function NotificationItem({ notification }: any) {
  return (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Link href={{ pathname: `/user/[id]`, params: { id: notification.sender._id } }} asChild>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={notification.sender.image}
              style={styles.avatar}
              contentFit='cover'
              transition={200}
            />
            <View style={styles.iconBadge}>
              {
                notification.type === "like" ? (
                  <Ionicons name="heart" size={16} color={COLORS.primary} />
                ) : notification.type === "follow" ? (
                  <Ionicons name='person-add' size={16} color={COLORS.primary} />
                ) : (
                  <Ionicons name='chatbubble' size={16} color={COLORS.primary} />
                )
              }
            </View>
          </TouchableOpacity>

        </Link>

        <View style={styles.notificationInfo}>
          <Link href={{ pathname: `/user/[id]`, params: { id: notification.sender._id } }} asChild>
            <TouchableOpacity>
              <Text style={styles.username}>
                {notification.sender.username}
              </Text>
            </TouchableOpacity>
          </Link>

          <Text style={styles.action}>
            {
              notification.type === "follow" ? "started following you" : notification.type === "like" ? "liked your post" : "commented on your post"
            }
          </Text>

          <Text style={styles.timeAgo}>
            {formatDistanceToNow(notification._creationTime, { addSuffix: true })}
          </Text>
        </View>
      </View>
      {
        notification.post && (
          <Image
            source={notification.post.imageUrl}
            style={styles.postImage}
            contentFit='cover'
            transition={200}
          />
        )
      }
    </View>

  )

}