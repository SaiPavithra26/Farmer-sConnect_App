import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Card from '@/src/components/common/Card/Card';
import { CircleCheck as CheckCircle, Clock, Truck, Package, MapPin } from 'lucide-react-native';

interface TrackingStep {
  id: string;
  title: string;
  description: string;
  timestamp?: string;
  isCompleted: boolean;
  isActive: boolean;
}

interface OrderTrackingProps {
  orderId: string;
  status: string;
  trackingSteps: TrackingStep[];
  estimatedDelivery?: string;
}

export default function OrderTracking({ 
  orderId, 
  status, 
  trackingSteps, 
  estimatedDelivery 
}: OrderTrackingProps) {
  
  const getStepIcon = (step: TrackingStep) => {
    if (step.isCompleted) {
      return <CheckCircle size={24} color={colors.success[600]} />;
    }
    
    if (step.isActive) {
      return <Clock size={24} color={colors.primary[600]} />;
    }

    // Default icons based on step content
    if (step.title.toLowerCase().includes('confirmed')) {
      return <CheckCircle size={24} color={colors.gray[300]} />;
    }
    if (step.title.toLowerCase().includes('shipped')) {
      return <Truck size={24} color={colors.gray[300]} />;
    }
    if (step.title.toLowerCase().includes('delivered')) {
      return <Package size={24} color={colors.gray[300]} />;
    }
    
    return <Clock size={24} color={colors.gray[300]} />;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Text style={styles.orderTitle}>Order #{orderId}</Text>
        <Text style={styles.currentStatus}>Current Status: {status}</Text>
        
        {estimatedDelivery && (
          <View style={styles.estimatedDelivery}>
            <MapPin size={16} color={colors.primary[600]} />
            <Text style={styles.estimatedText}>
              Estimated Delivery: {new Date(estimatedDelivery).toLocaleDateString('en-IN')}
            </Text>
          </View>
        )}
      </Card>

      {/* Progress Bar */}
      <Card style={styles.progressCard}>
        <Text style={styles.progressTitle}>Delivery Progress</Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${(trackingSteps.filter(s => s.isCompleted).length / trackingSteps.length) * 100}%` }
            ]} 
          />
        </View>
      </Card>

      {/* Tracking Steps */}
      <Card style={styles.stepsCard}>
        <Text style={styles.stepsTitle}>Order Timeline</Text>
        <View style={styles.timeline}>
          {trackingSteps.map((step, index) => (
            <View key={step.id} style={styles.timelineItem}>
              <View style={styles.timelineIconContainer}>
                {getStepIcon(step)}
                {index < trackingSteps.length - 1 && (
                  <View style={[
                    styles.timelineLine,
                    step.isCompleted && styles.timelineLineCompleted
                  ]} />
                )}
              </View>
              
              <View style={styles.timelineContent}>
                <Text style={[
                  styles.stepTitle,
                  step.isActive && styles.stepTitleActive,
                  step.isCompleted && styles.stepTitleCompleted
                ]}>
                  {step.title}
                </Text>
                
                <Text style={styles.stepDescription}>{step.description}</Text>
                
                {step.timestamp && (
                  <Text style={styles.stepTimestamp}>
                    {new Date(step.timestamp).toLocaleString('en-IN')}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </Card>

      {/* Delivery Information */}
      <Card style={styles.infoCard}>
        <Text style={styles.infoTitle}>Delivery Information</Text>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Tracking ID</Text>
          <Text style={styles.infoValue}>FC{orderId}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Delivery Partner</Text>
          <Text style={styles.infoValue}>FarmersConnect Express</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Contact Support</Text>
          <Text style={styles.infoValue}>+91 80000 12345</Text>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  headerCard: {
    margin: spacing.lg,
    marginBottom: spacing.md,
  },
  orderTitle: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.xl,
    color: colors.gray[800],
    marginBottom: spacing.xs,
  },
  currentStatus: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.md,
    color: colors.primary[600],
    marginBottom: spacing.md,
  },
  estimatedDelivery: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    padding: spacing.sm,
    borderRadius: 8,
  },
  estimatedText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.primary[700],
    marginLeft: spacing.sm,
  },
  progressCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  progressTitle: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.gray[200],
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary[600],
    borderRadius: 4,
  },
  stepsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  stepsTitle: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
    marginBottom: spacing.lg,
  },
  timeline: {
    paddingLeft: spacing.sm,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  timelineIconContainer: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  timelineLine: {
    width: 2,
    height: 40,
    backgroundColor: colors.gray[300],
    marginTop: spacing.sm,
  },
  timelineLineCompleted: {
    backgroundColor: colors.success[600],
  },
  timelineContent: {
    flex: 1,
    paddingTop: spacing.xs,
  },
  stepTitle: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[600],
    marginBottom: spacing.xs,
  },
  stepTitleActive: {
    color: colors.primary[600],
  },
  stepTitleCompleted: {
    color: colors.success[600],
  },
  stepDescription: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
  stepTimestamp: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.xs,
    color: colors.gray[500],
  },
  infoCard: {
    margin: spacing.lg,
  },
  infoTitle: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
    marginBottom: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  infoLabel: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  infoValue: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.gray[800],
  },
});