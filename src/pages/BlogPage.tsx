import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from '@/contexts/ThemeContext';

const blogPosts = [
  {
    id: 1,
    title: "The Future of Cryptocurrency",
    category: "Market Insights",
    readTime: "5 min read",
    date: "2024-03-20",
    author: {
      name: "Tony Smith",
      role: "Market Analyst",
      avatar: "https://ui-avatars.com/api/?name=Tony+Smith&background=10B981&color=fff"
    },
    tags: ["Cryptocurrency", "Market Analysis", "Future Trends"],
    content: "Explore the evolving landscape of cryptocurrency and its potential impact on the future of finance...",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "Security Best Practices in Crypto",
    category: "Security",
    readTime: "7 min read",
    date: "2024-03-18",
    author: {
      name: "Sarah Johnson",
      role: "Security Expert",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=2563EB&color=fff"
    },
    tags: ["Security", "Best Practices", "Wallet Safety", "Cybersecurity"],
    content: "Multi-factor authentication: Your first line of defense\nHardware vs Software wallets: Making the right choice\nCommon phishing tactics in crypto and how to avoid them\nThe importance of seed phrase management\nRegular security audits for your crypto holdings",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "DeFi Revolution: Beyond Traditional Banking",
    category: "Technology",
    readTime: "6 min read",
    date: "2024-03-15",
    author: {
      name: "Michael Chen",
      role: "DeFi Researcher",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=7C3AED&color=fff"
    },
    tags: ["DeFi", "Innovation", "Banking", "Finance"],
    content: "How DeFi is disrupting traditional lending and borrowing\nYield farming strategies for beginners\nSmart contracts: The backbone of DeFi applications\nRisk management in DeFi investments\nThe future of decentralized exchanges",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    title: "Crypto Tax Guide 2024",
    category: "Education",
    readTime: "8 min read",
    date: "2024-03-12",
    author: {
      name: "David Wilson",
      role: "Tax Consultant",
      avatar: "https://ui-avatars.com/api/?name=David+Wilson&background=0A8D4F&color=fff"
    },
    tags: ["Taxes", "Compliance", "Regulation", "Finance"],
    content: "Understanding your crypto tax obligations\nHow to track and report crypto transactions\nTax implications of DeFi yields and staking rewards\nCommon crypto tax mistakes to avoid\nTools and software for crypto tax reporting",
    image: "https://images.unsplash.com/photo-1554672723-b208dc85134f?w=800&auto=format&fit=crop&q=60"
  }
];

const featuredPost = blogPosts[0];

export default function BlogPage({ navigation }: any) {
  const { theme } = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ padding: 24, paddingTop: 36 }}>
        {/* Hero Section */}
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 8, color: theme.colors.primary }}>
          trustBank Blog
        </Text>
        <Text style={{ textAlign: 'center', color: theme.colors.secondaryText, marginBottom: 24 }}>
          Stay informed with the latest insights, trends, and news in cryptocurrency and blockchain technology.
        </Text>

        {/* Featured Post */}
        <View style={{ backgroundColor: theme.colors.card, borderRadius: 16, marginBottom: 32, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 10, elevation: 2 }}>
          <Image source={{ uri: featuredPost.image }} style={{ width: '100%', height: 180 }} resizeMode="cover" />
          <View style={{ padding: 20 }}>
            <Text style={{ color: theme.colors.primary, fontWeight: 'bold', marginBottom: 4 }}>Featured</Text>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 6, color: theme.colors.text }}>{featuredPost.title}</Text>
            <Text style={{ fontSize: 16, color: theme.colors.secondaryText, marginBottom: 12 }}>{featuredPost.content}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Image source={{ uri: featuredPost.author.avatar }} style={{ width: 32, height: 32, borderRadius: 16, marginRight: 8 }} />
              <View>
                <Text style={{ fontWeight: 'bold', color: theme.colors.text }}>{featuredPost.author.name}</Text>
                <Text style={{ color: theme.colors.secondaryText, fontSize: 12 }}>{featuredPost.author.role}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <Text style={{ color: theme.colors.secondaryText, fontSize: 12, marginRight: 16 }}>{featuredPost.date}</Text>
              <Text style={{ color: theme.colors.secondaryText, fontSize: 12 }}>{featuredPost.readTime}</Text>
            </View>
            <TouchableOpacity style={{ marginTop: 16, backgroundColor: theme.colors.primary, paddingVertical: 10, borderRadius: 8, alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Read More</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Blog Posts Grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {blogPosts.slice(1).map((post) => (
            <View key={post.id} style={{ width: '100%', maxWidth: 360, backgroundColor: theme.colors.card, borderRadius: 16, marginBottom: 24, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 8, elevation: 1 }}>
              <Image source={{ uri: post.image }} style={{ width: '100%', height: 120 }} resizeMode="cover" />
              <View style={{ padding: 16 }}>
                <Text style={{ color: theme.colors.primary, fontWeight: 'bold', marginBottom: 4 }}>{post.category}</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 6, color: theme.colors.text }}>{post.title}</Text>
                <Text numberOfLines={2} style={{ fontSize: 14, color: theme.colors.secondaryText, marginBottom: 10 }}>{post.content.split('\n')[0]}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                  <Image source={{ uri: post.author.avatar }} style={{ width: 24, height: 24, borderRadius: 12, marginRight: 6 }} />
                  <View>
                    <Text style={{ fontWeight: 'bold', color: theme.colors.text, fontSize: 13 }}>{post.author.name}</Text>
                    <Text style={{ color: theme.colors.secondaryText, fontSize: 11 }}>{post.date}</Text>
                  </View>
                </View>
                <TouchableOpacity style={{ marginTop: 4, alignSelf: 'flex-end' }}>
                  <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 13 }}>Bookmark</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
